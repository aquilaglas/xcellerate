import { json, type RequestHandler } from '@sveltejs/kit';
import { toSheet, type SheetRow } from '$lib/types/database.js';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { data, error } = await locals.supabase
            .from('sheets')
            .select('*')
            .eq('user_id', locals.user.id);

        if (error) {
            return json({ error: error.message }, { status: 400 });
        }

        return json({ sheets: data.map((row: SheetRow) => toSheet(row)) });
    } catch (error) {
        return json({ error: 'Failed to fetch sheets' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ locals, request }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        const { data, error } = await locals.supabase
            .from('sheets')
            .insert({
                user_id: locals.user.id,
                name: body.name,
                description: body.description || null,
                customer_ids: body.customerIds || []
            })
            .select()
            .single();

        if (error) {
            return json({ error: error.message }, { status: 400 });
        }

        return json({ sheet: toSheet(data) }, { status: 201 });
    } catch (error) {
        return json({ error: 'Failed to create sheet' }, { status: 500 });
    }
};
