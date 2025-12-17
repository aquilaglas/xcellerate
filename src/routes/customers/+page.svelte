<script lang="ts">
    import type {PageProps} from './$types.js';
    import {goto} from "$app/navigation";
    import Modal from "$lib/components/ui/Modal.svelte";
    import CustomerCard from "$lib/components/features/customer/CustomerCard.svelte";
    import Header from "$lib/components/ui/Header.svelte";
    import FilterSort from "$lib/components/ux/FilterSort.svelte";
    import {filterAndSortCustomers} from "$lib/utils/filter-sort.utils.js";

    const {data}: PageProps = $props();

    let nameFilter = $state('');
    let typeFilter = $state('');
    let containerTypeFilter = $state('');
    let priorityFilter = $state('');
    let statusFilter = $state('');
    let sortField = $state('name');
    let sortDirection = $state<'asc' | 'desc'>('asc');

    const filteredCustomers = $derived(
        filterAndSortCustomers(data.customers ?? [], {
            name: nameFilter,
            type: typeFilter,
            containerType: containerTypeFilter,
            priority: priorityFilter,
            status: statusFilter,
            sortField: sortField,
            sortDirection: sortDirection
        })
    );
</script>

<Header
        buttons={{
            createCustomer: true,
            sheetSelector: {
                sheetOptions: data.sheetOptions ?? [],
                selectedSheet: data.searchParams?.['sheet'] ?? ''
            }
        }}
>
    <div class="flex flex-col gap-4 p-4">
        <FilterSort
            bind:nameFilter
            bind:typeFilter
            bind:containerTypeFilter
            bind:priorityFilter
            bind:statusFilter
            bind:sortField
            bind:sortDirection
        />
        <h2 class="text-2xl font-bold text-green-700">
            {filteredCustomers.length} client{filteredCustomers.length > 1 ? 's' : ''}
            {#if filteredCustomers.length !== data.customers?.length}
                <span class="text-lg font-normal text-gray-600 dark:text-gray-400">
                    (sur {data.customers?.length} au total)
                </span>
            {/if}
        </h2>
    </div>
    {#if !data.sheetOptions || data.sheetOptions.length === 0}
        <Modal showModal={true} title="Importation Excel">
            <div class="flex flex-col gap-4 p-4">
                <span>Aucune donnée à afficher</span>
                <button type="button"
                        class="btn-primary"
                        onclick={() => goto('/')}>
                    <span class="text-white font-bold">Retour</span>
                </button>
            </div>
        </Modal>
    {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 p-4 pt-0">
            {#each filteredCustomers as customer}
                <CustomerCard {customer}/>
            {/each}
        </div>
    {/if}

    <!-- EXPORT DU FICHIER -->
    <!--<button class="btn-primary fixed bottom-0 right-0 h-fit z-50 m-2"
            onclick={() => exportXlsData(data.filteredAndSortedCustomers)}>
        <Download class="size-12"/>
    </button>-->
</Header>
