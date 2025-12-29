import {createDefaultCustomer} from "$lib/utils/customer.utils.js";
import { error, redirect } from "@sveltejs/kit";
import type {SearchParams} from "$lib/types/filter-sort.types.js";

export const load = async ({ fetch, url }) => {
    const params: SearchParams = Object.fromEntries(url.searchParams.entries());

    const res = await fetch(
        `/api/sheets/${params.sheet}/customers`,
        { method: 'POST', body: JSON.stringify(createDefaultCustomer())}
    );

    if (!res.ok) {
        console.error('[LOAD] Error failed to create customer', res.status);
        throw error(res.status, 'Échec de la création du client');
    }

    const data = await res.json();

    throw redirect(303, '/customers/' +  data.customer.id);
};