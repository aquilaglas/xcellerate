import { json, type RequestHandler } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import {setAuthCookies} from "$lib/server/supabase.js";

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return json({ error: 'Email and password are required' }, { status: 400 });
        }

        const supabase = createClient(
            PUBLIC_SUPABASE_URL,
            PUBLIC_SUPABASE_ANON_KEY,
            { auth: { persistSession: false } }
        );

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error || !data.session) {
            return json({ error: error?.message ?? 'Invalid login' }, { status: 401 });
        }

        const accessToken = data.session.access_token;
        const refreshToken = data.session.refresh_token;

        setAuthCookies(cookies, accessToken, refreshToken);

        return json({
            message: 'Login successful',
            user: data.user
        });
    }
    catch (err) {
        console.error(err);
        return json({ error: 'Login failed' }, { status: 500 });
    }
};
