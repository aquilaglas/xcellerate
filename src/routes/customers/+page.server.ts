import type {SortDirection, SortField} from "$lib/types/sort.types.js";
import {sortCustomers} from "$lib/utils/sort.utils.js";

export const load = async ({ url, fetch }) => {
    const res = await fetch('/api/customers');
    const customers = await res.json();

    const sortField = url.searchParams.get('sortField') as SortField ?? 'name';
    const sortDirection = url.searchParams.get('sortDirection') as SortDirection ?? 'asc';

    const sortedCustomers = sortCustomers(customers, sortField, sortDirection);

    return { sortedCustomers, sortField, sortDirection };
};