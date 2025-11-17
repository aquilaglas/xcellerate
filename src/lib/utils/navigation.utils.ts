import {browser} from "$app/environment";
import {goto} from "$app/navigation";
import type {SearchParams} from "$lib/types/filter-sort.types.js";

export const goToCustomers = async (
    searchParams: SearchParams = {'sortField': 'name', 'sortDirection': 'asc'}
) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    await goto(`/customers?${urlSearchParams.toString()}`);
}

export const goBackCustomers = async ()=>  {
    if (browser && window.history.length > 1) {
        window.history.back();
    } else {
        await goToCustomers();
    }
}
