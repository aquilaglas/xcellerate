<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="w-screen flex">
    {@render children()}
</div>
