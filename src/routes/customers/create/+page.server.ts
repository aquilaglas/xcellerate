import {createDefaultCustomer} from "$lib/utils/customer.utils.js";
import {redirect} from "@sveltejs/kit";

export const load = async ({ fetch }) => {
    try {
        const res = await fetch(
            '/api/customers',
            { method: 'POST', body: JSON.stringify(createDefaultCustomer())}
        );

        if (!res.ok) {
            throw new Error('Échec de la requête');
        }

        const customer = await res.json();

        return {customer};
    } catch (err) {
        console.error('[LOAD] Error failed to create customer', err);
        throw redirect(303, '/customers');
    }
};