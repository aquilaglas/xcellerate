import type {SortDirection, SortField} from "$lib/types/sort.types.js";
import {filterCustomers, sortCustomers} from "$lib/utils/sort.utils.js";

export const load = async ({ url, fetch }) => {
    const res = await fetch('/api/customers');
    const customers = await res.json();

    const sortField = url.searchParams.get('sortField') as SortField ?? 'name';
    const sortDirection = url.searchParams.get('sortDirection') as SortDirection ?? 'asc';
    const search = url.searchParams.get('search') as string ?? '';

    const filteredCustomers = filterCustomers(customers, sortField, search);
    const sortedCustomers = sortCustomers(filteredCustomers, sortField, sortDirection);

    return { sortedCustomers, sortField, sortDirection, search };
};