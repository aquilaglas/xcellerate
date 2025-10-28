// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type {Customer} from "$lib/types/customer.types.js";

declare global {
	namespace App {
        interface Locals {
            customers: Array<Customer>;
        }
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
