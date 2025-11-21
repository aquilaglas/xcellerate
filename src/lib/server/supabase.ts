import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import {createClient} from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
    PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
);

export function createUserClient(access_token: string | null, refresh_token: string | null = null) {
    const client = createClient(
        PUBLIC_SUPABASE_URL,
        PUBLIC_SUPABASE_ANON_KEY,
        { auth: { persistSession: false } }
    );

    if (access_token) {
        client.auth.setSession({
            access_token,
            refresh_token: refresh_token || ''
        });
    }

    return client;
}

export function setAuthCookies(cookies: any, access_token: any, refresh_token: any) {
    cookies.set('sb-access-token', access_token, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 60 * 60 * 24 * 7
    });

    cookies.set('sb-refresh-token', refresh_token, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 60 * 60 * 24 * 30
    });
}

export function clearAuthCookies(cookies: any) {
    cookies.delete('sb-access-token', { path: '/' });
    cookies.delete('sb-refresh-token', { path: '/' });
}
