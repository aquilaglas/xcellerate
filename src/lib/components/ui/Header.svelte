<script lang="ts">
    import {goto} from "$app/navigation";
    import {CirclePlus, Grid2x2Check} from "lucide-svelte";
    import {onMount} from "svelte";

    type Props = {
        withButtons?: boolean,
        children?: any,
    };

    const {withButtons = false, children}: Props = $props();

    let headerEl: HTMLElement;

    function setHeaderVar() {
        const h = headerEl?.getBoundingClientRect().height ?? 0;
        document.documentElement.style.setProperty('--header-h', `${h}px`);
    }

    onMount(() => {
        setHeaderVar();

        const ro = new ResizeObserver(setHeaderVar);
        if (headerEl) ro.observe(headerEl);

        window.addEventListener('resize', setHeaderVar);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', setHeaderVar);
        };
    });
</script>

<header
        bind:this={headerEl}
        style="padding-top: calc(env(safe-area-inset-top) + calc(var(--spacing) * 2));"
        class="fixed flex flex-col gap-2 inset-x-0 top-0 z-50 p-2"
>
    <div class="flex gap-4 items-center justify-between">
        <div class="flex items-center gap-2">
            <Grid2x2Check class="text-green-50 dark:text-gray-900 size-10"/>
            <h1 class="uppercase text-4xl text-green-50 dark:text-gray-900 font-bold">xcellerate</h1>
        </div>
        {#if withButtons}
            <button type="button" class="clickable-card flex flex-row py-2" onclick={() => goto('/customers/create')}>
                <span class="hidden sm:block font-bold">Ajouter un client</span>
                <CirclePlus class="block sm:hidden size-6"/>
            </button>
        {/if}
    </div>
</header>

<main style="padding-top: calc(env(safe-area-inset-top) + var(--header-h));">
    {@render children?.()}
</main>
