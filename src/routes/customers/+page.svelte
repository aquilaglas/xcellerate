<script lang="ts">
    import SearchBar from '$lib/components/ux/SearchBar.svelte';
    import type {PageProps} from './$types';
    import {goto} from "$app/navigation";
    import Modal from "$lib/components/ui/Modal.svelte";
    import {CircleArrowDown, CircleArrowUp, CirclePlus, Download, Grid2x2Check, X} from "lucide-svelte";
    import CustomerCard from "$lib/components/features/customer/CustomerCard.svelte";
    import {toggleSort} from "$lib/utils/sort.utils.js";
    import type {SortField} from "$lib/types/sort.types.js";
    import {exportXlsData} from "$lib/utils/xls.utils.js";
    import {onMount} from "svelte";

    const {data}: PageProps = $props();

    let headerEl: HTMLElement;

    function setHeaderVar() {
        const h = headerEl?.getBoundingClientRect().height ?? 0;
        document.documentElement.style.setProperty('--header-h', `${h}px`);
    }

    async function sort(field: SortField) {
        const toggleData = toggleSort(field, data.sortField, data.sortDirection);
        await goto('/customers?sortField=' + toggleData?.field + '&sortDirection=' + toggleData?.direction);
        window.location.reload();
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
        class="fixed flex flex-col gap-2 inset-x-0 top-0 z-50 p-2 bg-white border-b-4 border-black"
>
    <div class="flex gap-4 items-center justify-between">
        <div class="flex items-center gap-2">
            <Grid2x2Check class="text-black size-10"/>
            <h1 class="uppercase text-4xl text-black font-bold">xcellerate</h1>
        </div>
        <SearchBar/>
    </div>
    <button type="button"
            class="w-full flex uppercase bg-green-800 hover:bg-green-500 active:bg-green-500 justify-center rounded-lg p-2"
            onclick={() => goto('/customers/create')}>
        <span class="text-white text-xs font-bold">Ajouter un client</span>
        <CirclePlus class="ml-2 size-4"/>
    </button>
    <div class="flex flex-wrap gap-2">
        <button type="button"
                class="flex uppercase bg-black hover:bg-gray-700 active:bg-gray-700 items-center rounded-lg p-2"
                onclick={() => sort('name')}>
            <span class="text-white text-xs font-bold">Nom</span>
            {#if data.sortField === 'name' && data.sortDirection === 'asc'}
                <CircleArrowUp class="ml-2 size-4"/>
            {:else if data.sortField === 'name' && data.sortDirection === 'desc'}
                <CircleArrowDown class="ml-2 size-4"/>
            {/if}
        </button>
        <button type="button"
                class="flex uppercase bg-black hover:bg-gray-700 active:bg-gray-700 items-center rounded-lg p-2"
                onclick={() => sort('type')}>
            <span class="text-white text-xs font-bold">Type</span>
            {#if data.sortField === 'type' && data.sortDirection === 'asc'}
                <CircleArrowUp class="ml-2 size-4"/>
            {:else if data.sortField === 'type' && data.sortDirection === 'desc'}
                <CircleArrowDown class="ml-2 size-4"/>
            {/if}
        </button>
        <button type="button"
                class="flex uppercase bg-black hover:bg-gray-700 active:bg-gray-700 items-center rounded-lg p-2"
                onclick={() => sort('containerType')}>
            <span class="text-white text-xs font-bold">Type de contenant</span>
            {#if data.sortField === 'containerType' && data.sortDirection === 'asc'}
                <CircleArrowUp class="ml-2 size-4"/>
            {:else if data.sortField === 'containerType' && data.sortDirection === 'desc'}
                <CircleArrowDown class="ml-2 size-4"/>
            {/if}
        </button>
        <button type="button"
                class="flex uppercase bg-black hover:bg-gray-700 active:bg-gray-700 items-center rounded-lg p-2"
                onclick={() => sort('priority')}>
            <span class="text-white text-xs font-bold">Priorité</span>
            {#if data.sortField === 'priority' && data.sortDirection === 'asc'}
                <CircleArrowUp class="ml-2 size-4"/>
            {:else if data.sortField === 'priority' && data.sortDirection === 'desc'}
                <CircleArrowDown class="ml-2 size-4"/>
            {/if}
        </button>
        <button type="button"
                class="flex uppercase bg-black hover:bg-gray-700 active:bg-gray-700 items-center rounded-lg p-2"
                onclick={() => sort('status')}>
            <span class="text-white text-xs font-bold">Statut</span>
            {#if data.sortField === 'status' && data.sortDirection === 'asc'}
                <CircleArrowUp class="ml-2 size-4"/>
            {:else if data.sortField === 'status' && data.sortDirection === 'desc'}
                <CircleArrowDown class="ml-2 size-4"/>
            {/if}
        </button>
        <button type="button"
                class="flex uppercase bg-black hover:bg-gray-700 active:bg-gray-700 items-center rounded-lg p-2"
                onclick={() => sort('lastCommunication')}>
            <span class="text-white text-xs font-bold">Dernière communication</span>
            {#if data.sortField === 'lastCommunication' && data.sortDirection === 'asc'}
                <CircleArrowUp class="ml-2 size-4"/>
            {:else if data.sortField === 'lastCommunication' && data.sortDirection === 'desc'}
                <CircleArrowDown class="ml-2 size-4"/>
            {/if}
        </button>
    </div>
</header>

{#if !data.sortedCustomers || data.sortedCustomers.length === 0}
    <Modal showModal={true} title="Importation Excel">
        <div class="flex flex-col gap-4 p-4">
            <span>Aucune donnée à afficher</span>
            <button type="button"
                    class="uppercase bg-black hover:bg-gray-700 active:bg-gray-700 items-center rounded-lg p-4"
                    onclick={() => goto('/')}>
                <span class="text-white font-bold">Retour</span>
            </button>
        </div>
    </Modal>
{:else}
    <main
            style="padding-top: calc(env(safe-area-inset-top) + var(--header-h) + calc(var(--spacing) * 4));"
            class="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 p-4"
    >
        {#each data.sortedCustomers as customer}
            <CustomerCard {customer}/>
        {/each}
    </main>
{/if}
<button class="fixed bottom-0 right-0 h-fit z-50 m-2 bg-green-800 rounded-2xl hover:bg-green-500 active:bg-green-500 border-4 border-black p-4"
        onclick={() => exportXlsData(data.sortedCustomers)}>
    <Download class="size-16"/>
</button>