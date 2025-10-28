<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="h-screen w-screen flex">
    {@render children()}
</div>
