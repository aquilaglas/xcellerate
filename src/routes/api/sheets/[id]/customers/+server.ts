import { json, type RequestHandler } from '@sveltejs/kit';
import { toCustomer, type CustomerRow } from '$lib/types/database.js';

export const GET: RequestHandler = async ({ params, locals }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const sheetId = params.id;

        const { data: sheetData, error: sheetError } = await locals.supabase
            .from('sheets')
            .select('customer_ids')
            .eq('id', sheetId)
            .eq('user_id', locals.user.id)
            .single();

        if (sheetError) {
            return json({ error: sheetError }, { status: 400 });
        }

        const { data: customers, error, count } = await locals.supabase
            .from('customers')
            .select('*', { count: 'exact' })
            .in('id', sheetData.customer_ids)
            .eq('user_id', locals.user.id)
            .limit(10000);

        if (error) {
            return json({ error: error.message }, { status: 400 });
        }

        return json({
            customers: customers.map((row: CustomerRow) => toCustomer(row)),
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

        // Utiliser la fonction PostgreSQL atomique pour éviter les race conditions
        const { error: rpcError } = await locals.supabase
            .rpc('add_customer_to_sheet', {
                p_sheet_id: sheetId,
                p_customer_id: customer.id,
                p_user_id: locals.user.id
            });

        if (rpcError) {
            return json({ error: rpcError.message }, { status: 400 });
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
