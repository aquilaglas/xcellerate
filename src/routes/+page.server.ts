import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) throw redirect(303, '/login');

    const { data, count } = await locals.supabase
        .from('sheets')
        .select('id, name', { count: 'exact' })
        .eq('user_id', locals.user.id)
        .limit(1);

    console.log('[LOG] [+page.server.ts::load]', data);
    if ((count || 0) > 0) {
        throw redirect(303, '/customers?sortField=name&sortDirection=asc&sheet=' +  data?.[0].name);
    }

    return {};
};
