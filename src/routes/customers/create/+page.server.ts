import {createDefaultCustomer} from "$lib/utils/customer.utils.js";
import { error, redirect } from "@sveltejs/kit";

export const load = async ({ fetch }) => {
    const res = await fetch(
        '/api/customers',
        { method: 'POST', body: JSON.stringify(createDefaultCustomer())}
    );

    if (!res.ok) {
        console.error('[LOAD] Error failed to create customer', res.status);
        throw error(res.status, 'Échec de la création du client');
    }

    const data = await res.json();

    throw redirect(303, '/customers/' +  data.customer.id);
};