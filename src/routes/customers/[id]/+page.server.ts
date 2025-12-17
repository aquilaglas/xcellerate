import {redirect} from "@sveltejs/kit";

export const load = async ({fetch, params}) => {
    try {
        const res = await fetch('/api/customers/' + params.id);

        if (!res.ok) {
            throw new Error('Échec de la requête');
        }

        const data = await res.json();

        return {customer: data.customer};
    } catch (err) {
        console.error('[LOAD] Error loading: customer/' + params.id, err);
        throw redirect(303, '/customers');
    }
};
