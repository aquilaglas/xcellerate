import {browser} from "$app/environment";
import {goto} from "$app/navigation";
import type {SearchParams} from "$lib/types/filter-sort.types.js";

export const goBackCustomers = async ()=>  {
    if (browser && window.history.length > 1) {
        window.history.back();
    }
}
