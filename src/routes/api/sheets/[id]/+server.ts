import { json, type RequestHandler } from '@sveltejs/kit';
import { toSheet } from '$lib/types/database.js';

export const GET: RequestHandler = async ({ locals, params }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { data, error } = await locals.supabase
            .from('sheets')
            .select('*')
            .eq('id', params.id)
            .eq('user_id', locals.user.id)
            .single();

        if (error) {
            return json({ error: 'Sheet not found' }, { status: 404 });
        }

        return json({ sheet: toSheet(data) });
    } catch (error) {
        return json({ error: 'Failed to fetch sheet' }, { status: 500 });
    }
};

export const PUT: RequestHandler = async ({ locals, params, request }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        const updateData: any = {};
        if (body.name !== undefined) updateData.name = body.name;
        if (body.description !== undefined) updateData.description = body.description;
        if (body.customerIds !== undefined) updateData.customer_ids = body.customerIds;

        const { data, error } = await locals.supabase
            .from('sheets')
            .update(updateData)
            .eq('id', params.id)
            .eq('user_id', locals.user.id)
            .select()
            .single();

        if (error) {
            return json({ error: error.message }, { status: 400 });
        }

        return json({ sheet: toSheet(data) });
    } catch (error) {
        return json({ error: 'Failed to update sheet' }, { status: 500 });
    }
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { error } = await locals.supabase
            .from('sheets')
            .delete()
            .eq('id', params.id)
            .eq('user_id', locals.user.id);

        if (error) {
            return json({ error: error.message }, { status: 400 });
        }

        return json({ message: 'Sheet deleted successfully' });
    } catch (error) {
        return json({ error: 'Failed to delete sheet' }, { status: 500 });
    }
};
