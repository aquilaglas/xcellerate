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

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            return json({ error: error.message ?? 'Registration failed' }, { status: 400 });
        }

        if (data.session) {
            setAuthCookies(cookies, data.session.access_token, data.session.refresh_token);
        }

        return json({
            message:
                'Registration successful. If email confirmation is enabled, please check your inbox.',
            user: data.user
        });
    } catch (err) {
        console.error(err);
        return json({ error: 'Registration failed' }, { status: 500 });
    }
};
