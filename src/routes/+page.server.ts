import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) throw redirect(303, '/login');

    const { data, count } = await locals.supabase
        .from('sheets')
        .select('id', { count: 'exact' })
        .eq('user_id', locals.user.id)
        .limit(1);

    if ((count || 0) > 0) {
        throw redirect(303, '/customers?sheet=' +  data?.[0].id);
    }

    return {};
};
