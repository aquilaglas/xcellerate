import {createDefaultCustomer} from "$lib/utils/customer.utils.js";

export const load = async ({ fetch }) => {
    const res = await fetch('/api/customers', { method: 'POST', body: JSON.stringify(createDefaultCustomer())});
    const customer = await res.json();

    return { customer };
};