export const load = async ({ fetch }) => {
    const res = await fetch('/api/customers', { method: 'DELETE' });
    const customers = await res.json();

    return { customers };
};