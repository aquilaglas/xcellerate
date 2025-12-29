<script lang="ts">
	import '../app.css';
	import { navigating } from '$app/stores';
	import Loader from '$lib/components/ui/Loader.svelte';
	import { isLoading } from '$lib/stores/loader.store';

	let { children } = $props();

	const isNavigating = $derived(!!$navigating);
	const showLoader = $derived(isNavigating || $isLoading);
</script>

<Loader active={showLoader} respectHeader={true} />

<div class="w-screen flex">
    {@render children()}
</div>
