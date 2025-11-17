import {filterAndSortCustomers} from "$lib/utils/filter-sort.utils.js";
import type {SearchParams} from "$lib/types/filter-sort.types.js";

export const load = async ({ url, fetch }) => {
    const params: SearchParams = Object.fromEntries(url.searchParams.entries());

    const res = await fetch('/api/customers');
    const customers = await res.json();

    const filteredAndSortedCustomers = filterAndSortCustomers(customers, params);

    return { filteredAndSortedCustomers, searchParams: params };
};