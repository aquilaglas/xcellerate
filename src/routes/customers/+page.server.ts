import type {Customer, Sheet} from '$lib/types/models.js';
import type {SearchParams} from "$lib/types/filter-sort.types.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async (
    { url, fetch }
): Promise<{ customers: Customer[], sheets: Sheet[], searchParams: SearchParams} | undefined> => {
    try {
        const params: SearchParams = Object.fromEntries(url.searchParams.entries());

        const sheetsRes = await fetch('/api/sheets');
        if (!sheetsRes.ok) {
            console.error('[LOAD] Failed to fetch sheets', sheetsRes.status, await sheetsRes.text());
            throw new Error('Failed to fetch sheets');
        }

        const sheetsData = await sheetsRes.json();
        const sheets: Sheet[] = sheetsData.sheets || [];
        const firstSheet = sheets?.[0];

        if (!firstSheet) {
            console.warn('[LOAD] No sheets found for user');
            return { customers: [], sheets: [], searchParams: params };
        }

        params.sheet = params.sheet || firstSheet.name;

        const customersRes = await fetch(`/api/sheets/${firstSheet.id}/customers?` + (new URLSearchParams(params)).toString());
        if (!customersRes.ok) {
            console.error('[LOAD] Failed to fetch sheet customers', customersRes.status, await customersRes.text());
            throw new Error('Failed to fetch sheet customers');
        }

        const customersData = await customersRes.json();
        const customers: Customer[] = customersData.customers || [];

        return { customers: customers, sheets: sheets, searchParams: params };
    } catch (error) {
        console.error('[LOAD] Error loading sheets/customers:', error);
    }
};
