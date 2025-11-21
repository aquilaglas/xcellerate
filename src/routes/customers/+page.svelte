<script lang="ts">
    import type {PageProps} from './$types.js';
    import {goto} from "$app/navigation";
    import Modal from "$lib/components/ui/Modal.svelte";
    import CustomerCard from "$lib/components/features/customer/CustomerCard.svelte";
    import Header from "$lib/components/ui/Header.svelte";
    import FilterSort from "$lib/components/ux/FilterSort.svelte";

    const {data}: PageProps = $props();
</script>

<Header
        buttons={{
            createCustomer: true,
            sheetSelector: {
                searchParams: data.searchParams || {},
                sheetNames: data.sheets?.map((sheet) => sheet.name) ?? [],
                selectedSheet: data.searchParams?.['sheet'] ?? ''
            }
        }}
>
    <div class="flex flex-col gap-4 p-4">
        <FilterSort searchParams={data.searchParams ?? {}} />
        <h2 class="text-2xl font-bold text-green-700">{data.customers?.length} clients</h2>
    </div>
    {#if !data.sheets || data.sheets.length === 0}
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
            {#each data.customers as customer}
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
