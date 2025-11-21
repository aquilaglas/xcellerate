import { json, type RequestHandler } from '@sveltejs/kit';
import {clearAuthCookies} from "$lib/server/supabase.js";

export const POST: RequestHandler = async ({ locals, cookies }) => {
    try {
        await locals.supabase.auth.signOut();

        clearAuthCookies(cookies);

        return json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error(err);
        return json({ error: 'Logout failed' }, { status: 500 });
    }
};
