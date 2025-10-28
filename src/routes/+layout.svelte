<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="h-svh w-screen flex">
    {@render children()}
</div>
