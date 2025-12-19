<script lang="ts">
	import '../app.css';
	import { navigating } from '$app/stores';
	import Loader from '$lib/components/ui/Loader.svelte';

	let { children } = $props();

	const isNavigating = $derived(!!$navigating);
</script>

<Loader active={isNavigating} respectHeader={true} />

<div class="w-screen flex">
    {@render children()}
</div>
