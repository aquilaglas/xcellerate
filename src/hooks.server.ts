import type { Handle } from '@sveltejs/kit';
import type {Customer} from "$lib/types/customer.types.js";

const sessions = new Map<string, Array<Customer>>();

export const handle: Handle = async ({ event, resolve }) => {
    let sessionId = event.cookies.get('session_id');

    if (!sessionId) {
        sessionId = crypto.randomUUID();
        event.cookies.set('session_id', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24,
            httpOnly: true,
            sameSite: 'lax'
        });
    }

    // @ts-ignore
    event.locals.customers = sessions.get(sessionId) ?? [] ;

    const response = await resolve(event);

    // @ts-ignore
    sessions.set(sessionId, event.locals.customers);

    return response;
};
