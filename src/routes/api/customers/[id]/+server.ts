import { json, type RequestHandler } from '@sveltejs/kit';
import { toCustomer } from '$lib/types/database.js';

export const GET: RequestHandler = async ({ locals, params }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { data, error } = await locals.supabase
            .from('customers')
            .select('*')
            .eq('id', params.id)
            .eq('user_id', locals.user.id)
            .single();

        if (error || !data) {
            return json({ error: 'Customer not found' }, { status: 404 });
        }

        return json({ customer: toCustomer(data) });
    } catch (error) {
        return json({ error: 'Failed to fetch customer' }, { status: 500 });
    }
};

export const PUT: RequestHandler = async ({ locals, params, request }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        const updateData: Record<string, any> = {};
        if ('name' in body) updateData.name = body.name;
        if ('addresses' in body) updateData.addresses = body.addresses;
        if ('type' in body) updateData.type = body.type;
        if ('contacts' in body) updateData.contacts = body.contacts;
        if ('containerType' in body) updateData.container_type = body.containerType;
        if ('status' in body) updateData.status = body.status;
        if ('lastCommunication' in body) updateData.last_communication = body.lastCommunication;
        if ('priority' in body) updateData.priority = body.priority;
        if ('comments' in body) updateData.comments = body.comments;
        if ('otherData' in body) updateData.other_data = body.otherData;

        const { data, error } = await locals.supabase
            .from('customers')
            .update(updateData)
            .eq('id', params.id)
            .eq('user_id', locals.user.id)
            .select()
            .single();

        if (error) {
            return json({ error: error.message }, { status: 400 });
        }

        return json({ customer: toCustomer(data) });
    } catch (error) {
        return json({ error: 'Failed to update customer' }, { status: 500 });
    }
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { error } = await locals.supabase
            .from('customers')
            .delete()
            .eq('id', params.id)
            .eq('user_id', locals.user.id);

        if (error) {
            return json({ error: error.message }, { status: 400 });
        }

        return json({ message: 'Customer deleted successfully' });
    } catch (error) {
        return json({ error: 'Failed to delete customer' }, { status: 500 });
    }
};
