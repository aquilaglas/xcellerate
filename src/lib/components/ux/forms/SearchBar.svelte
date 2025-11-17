<script lang="ts">
    import {Search} from "lucide-svelte";
    import Selector from "$lib/components/ux/Selector.svelte";
    import {
        containerTypeColorOptions,
        priorityColorOptions,
        statusColorOptions,
        typeColorOptions
    } from "$lib/types/customer.types.js";
    import {goToCustomers} from "$lib/utils/navigation.utils.js";
    import {translate} from "$lib/utils/translator.utils.ts";
    import type {SearchParams} from "$lib/types/filter-sort.types.js";

    type Props = {
        searchParams: SearchParams;
    };

    let {
        searchParams,
    }: Props = $props();

    let options: Record<string, Record<string, string | null>> = {
        type: typeColorOptions,
        containerType: containerTypeColorOptions,
        priority: priorityColorOptions,
        status: statusColorOptions,
    };

    let searchField: keyof Customer = $state(searchParams['sortField'] ?? 'name');
    let search: string = $state(searchParams['search'] ?? '');
    let oldSearch: string = $state(searchParams['search'] ?? '');
    let refSelector: Selector | undefined = $state();

    async function handleSearch(event?: SubmitEvent) {
        event?.preventDefault();

        searchParams['search'] = search;
        await goToCustomers(searchParams);
        window.location.reload();
    }

    $effect(() => {
        if (options[searchField] && search !== oldSearch) {
            handleSearch();
            oldSearch = search;
        }
    });
</script>

<form onsubmit={handleSearch}>
    <Selector bind:this={refSelector} options={options[searchField]} bind:value={search}>
        <div class="btn-secondary gap-0 font-light p-0 group hover:bg-gray-300 active:bg-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-800">
            {#if options[searchField]}
                <button class="w-full input border-2 shadow-none dark:border-gray-800 text-left" type="button"
                        onclick={refSelector.toggleDropdown} title={translate(searchField)}>
                    {#if search === ''}
                        <span>Rechercher un client par {translate(searchField)}</span>
                    {:else}
                        <span>{search}</span>
                    {/if}
                </button>
            {:else}
                <input class="w-full input border-2 shadow-none dark:border-gray-800" type="search"
                       id="search-bar-input" placeholder="Rechercher un client par {translate(searchField)}"
                       bind:value={search}/>
            {/if}
            <button type="submit">
                <Search class="text-gray-900 dark:text-green-50 bg-gray-300 dark:bg-gray-800
			            transition-colors duration-300 ease-in-out m-2"/>
            </button>
        </div>
    </Selector>
</form>