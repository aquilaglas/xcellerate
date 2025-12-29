import { writable } from 'svelte/store';

export const isLoading = writable(false);

export function setLoading(loading: boolean) {
    isLoading.set(loading);
}
