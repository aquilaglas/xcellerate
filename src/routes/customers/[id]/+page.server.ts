export const load = async ({ fetch, params }) => {
    const res = await fetch('/api/customers/' + params.id);
    const customer = await res.json();

    return { customer };
};