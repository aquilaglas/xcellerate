import { json, type RequestHandler } from '@sveltejs/kit';
import { toCustomer, type CustomerRow } from '$lib/types/database.js';

export const GET: RequestHandler = async ({ locals, url }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const search = url.searchParams.get('search') || '';
        const sortBy = url.searchParams.get('sortBy') || 'created_at';
        const sortOrderParam = url.searchParams.get('sortOrder') || 'desc';
        const sortOrder = sortOrderParam === 'asc' ? 'asc' : 'desc';

        const status = url.searchParams.get('status');
        const type = url.searchParams.get('type');
        const priority = url.searchParams.get('priority');

        const sheetName = url.searchParams.get('sheet') || null;

        let query = locals.supabase
            .from('customers')
            .select('*', { count: 'exact' })
            .eq('user_id', locals.user.id);

        if (sheetName) {
            const { data: sheets, error: sheetError } = await locals.supabase
                .from('sheets')
                .select('id, name, customer_ids')
                .eq('user_id', locals.user.id)
                .ilike('name', sheetName)
                .limit(1)
                .single();

            if (sheetError || !sheets) {
                return json({ error: `Sheet "${sheetName}" not found` }, { status: 404 });
            }

            const customerIds = sheets.customer_ids || [];
            if (customerIds.length === 0) {
                return json({ customers: [], count: 0 });
            }

            query = query.in('id', customerIds);
        }

        if (search) query = query.ilike('name', `%${search}%`);
        if (status) query = query.eq('status', status);
        if (type) query = query.eq('type', type);
        if (priority) query = query.eq('priority', priority);

        query = query.order(sortBy, { ascending: sortOrder === 'asc' });

        const { data, error, count } = await query;

        if (error) {
            return json({ error: error.message }, { status: 400 });
        }

        return json({
            customers: data.map((row: CustomerRow) => toCustomer(row)),
            count,
        });
    } catch (error) {
        return json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ locals, params, request }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sheetId = params.id;

    try {
        const body = await request.json();

        const { data: customer, error: customerError } = await locals.supabase
            .from('customers')
            .insert({
                user_id: locals.user.id,
                name: body.name || '?',
                addresses: body.addresses || [],
                type: body.type || 'standard',
                contacts: body.contacts || [],
                container_type: body.containerType || 'default',
                status: body.status || 'active',
                last_communication: body.lastCommunication || null,
                priority: body.priority || 'medium',
                comments: body.comments || [],
                other_data: body.otherData || {}
            })
            .select()
            .single();

        if (customerError) {
            return json({ error: customerError.message }, { status: 400 });
        }

        const { data: sheet, error: sheetError } = await locals.supabase
            .from('sheets')
            .select('customer_ids')
            .eq('id', sheetId)
            .eq('user_id', locals.user.id)
            .single();

        if (sheetError || !sheet) {
            return json({ error: 'Sheet not found or unauthorized' }, { status: 404 });
        }

        const updatedIds = Array.from(new Set([...(sheet.customer_ids || []), customer.id]));

        const { error: updateError } = await locals.supabase
            .from('sheets')
            .update({ customer_ids: updatedIds })
            .eq('id', sheetId);

        if (updateError) {
            return json({ error: updateError.message }, { status: 400 });
        }

        return json({
            message: 'Customer created and linked to sheet',
            customer: toCustomer(customer)
        }, { status: 201 });

    } catch (err) {
        console.error('POST /sheets/[id]/customers error:', err);
        return json({ error: 'Failed to create customer' }, { status: 500 });
    }
};
