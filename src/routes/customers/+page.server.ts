import { error } from '@sveltejs/kit';
import type {Customer, Sheet} from '$lib/types/models.js';
import type {SearchParams} from "$lib/types/filter-sort.types.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async (
    { url, fetch }
): Promise<{ customers: Customer[], sheetOptions: { label: string, value: string }[], searchParams: SearchParams}> => {
    const params: SearchParams = Object.fromEntries(url.searchParams.entries());

    const sheetsRes = await fetch('/api/sheets');
    if (!sheetsRes.ok) {
        console.error('[LOAD] Failed to fetch sheets', sheetsRes.status, await sheetsRes.text());
        throw error(sheetsRes.status, 'Échec du chargement des feuilles');
    }

    const sheetsData = await sheetsRes.json();
    const sheetOptions = sheetsData.sheets.map((s: Sheet) => ({label: s.name, value: s.id})) ?? [];

    const customersRes = await fetch(`/api/sheets/${params.sheet}/customers`);
    if (!customersRes.ok) {
        console.error('[LOAD] Failed to fetch sheet customers', customersRes.status, await customersRes.text());
        throw error(customersRes.status, 'Échec du chargement des clients de la feuille');
    }

    const customersData = await customersRes.json();
    const customers: Customer[] = customersData.customers || [];

    return { customers, sheetOptions, searchParams: params };
};
