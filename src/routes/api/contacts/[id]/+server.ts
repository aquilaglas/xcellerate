import { json, type RequestHandler } from '@sveltejs/kit';
import { toContact } from '$lib/types/database.js';

export const GET: RequestHandler = async ({ locals, params }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { data, error } = await locals.supabase
            .from('contacts')
            .select('*')
            .eq('id', params.id)
            .eq('user_id', locals.user.id)
            .single();

        if (error) {
            return json({ error: 'Contact not found' }, { status: 404 });
        }

        return json({ contact: toContact(data) });
    } catch (error) {
        return json({ error: 'Failed to fetch contact' }, { status: 500 });
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
        if (body.email !== undefined) updateData.email = body.email;
        if (body.phone !== undefined) updateData.phone = body.phone;
        if (body.customerId !== undefined) updateData.customer_id = body.customerId;

        const { data, error } = await locals.supabase
            .from('contacts')
            .update(updateData)
            .eq('id', params.id)
            .eq('user_id', locals.user.id)
            .select()
            .single();

        if (error) {
            return json({ error: error.message }, { status: 400 });
        }

        return json({ contact: toContact(data) });
    } catch (error) {
        return json({ error: 'Failed to update contact' }, { status: 500 });
    }
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { error } = await locals.supabase
            .from('contacts')
            .delete()
            .eq('id', params.id)
            .eq('user_id', locals.user.id);

        if (error) {
            return json({ error: error.message }, { status: 400 });
        }

        return json({ message: 'Contact deleted successfully' });
    } catch (error) {
        return json({ error: 'Failed to delete contact' }, { status: 500 });
    }
};
