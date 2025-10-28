import {redirect} from "@sveltejs/kit";

export const load = async ({fetch, params}) => {
    try {
        const res = await fetch('/api/customers/' + params.id);

        if (!res.ok) {
            throw new Error('Échec de la requête');
        }

        const customer = await res.json();

        return {customer};
    } catch (err) {
        console.error('Erreur dans load:', err);
        throw redirect(303, '/customers');
    }
};