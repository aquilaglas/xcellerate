import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
    const { data, error } = await locals.supabase
        .from('customers')
        .select('*')
        .limit(1);

    return json({
        ok: !error,
        user: locals.user,
        row: data?.[0] ?? null,
        error: error?.message ?? null
    });
}
