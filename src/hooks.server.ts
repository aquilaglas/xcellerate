import {type Handle, redirect} from "@sveltejs/kit";
import {createUserClient, setAuthCookies} from "$lib/server/supabase.js";

export const handle: Handle = async ({ event, resolve }) => {
    let access_token = event.cookies.get('sb-access-token') || null;
    let refresh_token = event.cookies.get('sb-refresh-token') || null;
    let supabase = createUserClient(access_token, refresh_token);

    let { data: { user } } = await supabase.auth.getUser();

    if (!user && refresh_token) {
        const { data, error } = await supabase.auth.refreshSession({ refresh_token });

        if (!error && data?.session) {
            access_token = data.session.access_token;
            refresh_token = data.session.refresh_token;

            setAuthCookies(event.cookies, access_token, refresh_token);

            supabase = createUserClient(access_token, refresh_token);
            user = data.session.user;
        }
    }

    event.locals.user = user;
    event.locals.supabase = supabase;

    const publicRoutes = ['/login', '/register'];
    const pathname = event.url.pathname;
    const isPublic = publicRoutes.some(r => pathname.startsWith(r));
    const isApi = pathname.startsWith('/api');

    if (isApi) {
        if (!user && !pathname.startsWith('/api/auth')) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        return resolve(event);
    }

    if (!user && !isPublic) {
        throw redirect(303, '/login');
    }

    return resolve(event);
};
