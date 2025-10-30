<script lang="ts">
    import type {PageProps} from './$types';
    import {goto} from "$app/navigation";
    import Modal from "$lib/components/ui/Modal.svelte";
    import {CircleArrowDown, CircleArrowUp, CirclePlus, Download, Grid2x2Check, X} from "lucide-svelte";
    import CustomerCard from "$lib/components/features/customer/CustomerCard.svelte";
    import {exportXlsData} from "$lib/utils/xls.utils.js";
    import Header from "$lib/components/ui/Header.svelte";
    import ButtonSort from "$lib/components/ux/ButtonSort.svelte";
    import SearchBar from "$lib/components/ux/SearchBar.svelte";

    const {data}: PageProps = $props();

    let filterData: Record<string, string> = {
        name: "nom",
        type: "type",
        containerType: "contenant",
        priority: "priorité",
        status: "statut",
        lastCommunication: "dernière com"
    };
</script>

<Header withButtons={true}>
    <div class="flex flex-col gap-4 p-4">
        <SearchBar searchField={filterData[data.sortField]}/>
        <div class="flex flex-wrap gap-2">
            {#each Object.entries(filterData) as [key, value]}
                <ButtonSort sortField={data.sortField} sortDirection={data.sortDirection} field={key} title={value}/>
            {/each}
        </div>
        <h2 class="text-2xl font-bold text-green-700">{data.sortedCustomers.length} clients</h2>
    </div>
    {#if !data.sortedCustomers || data.sortedCustomers.length === 0}
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
            {#each data.sortedCustomers as customer}
                <CustomerCard {customer}/>
            {/each}
        </div>
    {/if}
    <button class="btn-primary fixed bottom-0 right-0 h-fit z-50 m-2"
            onclick={() => exportXlsData(data.sortedCustomers)}>
        <Download class="size-12"/>
    </button>
</Header>
