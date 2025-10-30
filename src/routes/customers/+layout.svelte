<script lang="ts">
	let { children } = $props();
</script>

<div class="w-full">
    {@render children()}
    <footer class="h-[100px]
        bg-[linear-gradient(to_bottom,_theme(colors.gray.100)_20%,_theme(colors.green.700)_100%)]
        dark:bg-[linear-gradient(to_bottom,_theme(colors.gray.900)_20%,_theme(colors.green.700)_100%)]
    ">
    </footer>
</div>