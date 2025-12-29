import { json, type RequestHandler } from '@sveltejs/kit';
import { toContact, type ContactRow } from '$lib/types/database.js';

export const GET: RequestHandler = async ({ locals, url }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const customerId = url.searchParams.get('customerId');

        let query = locals.supabase
            .from('contacts')
            .select('*')
            .eq('user_id', locals.user.id);

        if (customerId) {
            query = query.eq('customer_id', customerId);
        }

        const { data, error } = await query;

        if (error) {
            return json({ error: error.message }, { status: 400 });
        }

        return json({ contacts: data.map((row: ContactRow) => toContact(row)) });
    } catch (error) {
        return json({ error: 'Failed to fetch contacts' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ locals, request }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        const { data, error } = await locals.supabase
            .from('contacts')
            .insert({
                user_id: locals.user.id,
                customer_id: body.customerId,
                name: body.name,
                email: body.email || null,
                phone: body.phone || null
            })
            .select()
            .single();

        if (error) {
            return json({ error: error.message }, { status: 400 });
        }

        return json({ contact: toContact(data) }, { status: 201 });
    } catch (error) {
        return json({ error: 'Failed to create contact' }, { status: 500 });
    }
};
