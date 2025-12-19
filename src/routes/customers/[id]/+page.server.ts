import { error } from '@sveltejs/kit';

export const load = async ({fetch, params}) => {
    const res = await fetch('/api/customers/' + params.id);

    if (!res.ok) {
        console.error('[LOAD] Error loading: customer/' + params.id, res.status);
        throw error(res.status, 'Échec du chargement du client');
    }

    const data = await res.json();

    return {customer: data.customer};
};
