import type {RequestHandler} from '@sveltejs/kit';
import type {Customer} from "$lib/types/customer.types.js";

export const GET: RequestHandler = async ({locals}) => {
    const customers: Array<Customer> = locals.customers;

    if (!customers) {
        return new Response(JSON.stringify({ error: 'Not found' }), {status: 404});
    }
    return new Response(JSON.stringify(customers), {status: 200});
};

export const POST: RequestHandler = async ({request, locals}) => {
    const customer: Customer = await request.json();

    if (!customer.id || customer.id === '') {
        customer.id = crypto.randomUUID();
    }

    const beforeLength = locals.customers.length;
    const afterLength = locals.customers.push({
        ...customer,
        addresses: [...customer.addresses],
        contacts: [...customer.contacts],
        comments: [...customer.comments]
    });

    if (afterLength !== beforeLength + 1) {
        return new Response(JSON.stringify({ error: 'Push failed' }), {status: 500});
    }

    return new Response(JSON.stringify(customer), {status: 201});
};

export const DELETE: RequestHandler = async ({locals}) => {
    while (locals.customers.length > 0) {
        locals.customers.pop();
    }
    return new Response(JSON.stringify({ok: true}), {status: 200});
};
