import type { RequestHandler } from '@sveltejs/kit';
import type {Customer} from "$lib/types/customer.types.js";

export const GET: RequestHandler = async ({ locals, params }) => {
    const id: string = params.id as string;

    const customer: Customer | undefined = locals.customers.find((customer: Customer) => customer.id === id);

    if (!customer) {
        return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(customer), { status: 200 });
};

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
    const id: string = params.id as string;

    const index: number | undefined = locals.customers.findIndex((customer: Customer) => customer.id === id);

    if (index === -1) {
        return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    }

    const updates: Customer = await request.json();

    const addresses = updates.addresses.filter(value => value !== '');
    const contacts = updates.contacts.filter(value => value !== '');
    const comments = updates.comments.filter(value => value !== '');

    locals.customers.splice(index, 1);
    locals.customers.push({
        ...updates,
        addresses: [...addresses],
        contacts: [...contacts],
        comments: [...comments]
    });

    return new Response(JSON.stringify(updates), { status: 200 });
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
    const id: string = params.id as string;

    const index: number | undefined = locals.customers.findIndex((customer: Customer) => customer.id === id);

    if (index === -1) {
        return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    }

    if (locals.customers) {
        locals.customers.splice(index as number, 1);
    } else {
        return new Response(JSON.stringify({ error: 'There is no customers' }), { status: 404 });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
