<script lang="ts">
    // @ts-ignore
    import { X } from "lucide-svelte";
    import { translate } from "$lib/utils/translator.utils.js";
    import { TypeEnum } from "$lib/enums/type.enum.js";
    import { ContainerTypeEnum } from "$lib/enums/container-type.enum.js";
    import { PriorityEnum } from "$lib/enums/priority.enum.js";
    import { StatusEnum } from "$lib/enums/status.enum.js";
    import Selector from "$lib/components/ux/Selector.svelte";

    type Props = {
        nameFilter: string;
        typeFilter: string;
        containerTypeFilter: string;
        priorityFilter: string;
        statusFilter: string;
    };

    let {
        nameFilter = $bindable(),
        typeFilter = $bindable(),
        containerTypeFilter = $bindable(),
        priorityFilter = $bindable(),
        statusFilter = $bindable()
    }: Props = $props();

    function clearFilters() {
        nameFilter = '';
        typeFilter = '';
        containerTypeFilter = '';
        priorityFilter = '';
        statusFilter = '';
    }

    const activeFiltersCount = $derived(
        [nameFilter, typeFilter, containerTypeFilter, priorityFilter, statusFilter]
            .filter(f => f && f !== '').length
    );
</script>

<div class="flex flex-col gap-3 border-b border-gray-300 pb-4">
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">
            Filtres
            {#if activeFiltersCount > 0}
                <span class="text-sm font-normal text-gray-600 dark:text-gray-400">
                    ({activeFiltersCount} actif{activeFiltersCount > 1 ? 's' : ''})
                </span>
            {/if}
        </h3>
        {#if activeFiltersCount > 0}
            <button
                type="button"
                onclick={clearFilters}
                class="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:underline"
                title="Réinitialiser tous les filtres"
            >
                <X class="size-4" />
                Réinitialiser
            </button>
        {/if}
    </div>

    <div class="flex flex-wrap gap-2">
        <input
            type="text"
            placeholder="Rechercher par {translate('name')}"
            bind:value={nameFilter}
            class="input flex-1 min-w-[200px]"
        />
        <Selector
            options={Object.values(TypeEnum).map(value => ({label: value, value: value}))}
            bind:value={typeFilter}
            emptyLabel="tous les types"
            buttonClass="btn-secondary py-2"
        />
        <Selector
            options={Object.values(ContainerTypeEnum).map(value => ({label: value, value: value}))}
            bind:value={containerTypeFilter}
            emptyLabel="tous les contenants"
            buttonClass="btn-secondary py-2"
        />
        <Selector
            options={Object.values(PriorityEnum).map(value => ({label: value, value: value}))}
            bind:value={priorityFilter}
            emptyLabel="toutes les priorités"
            buttonClass="btn-secondary py-2"
        />
        <Selector
            options={Object.values(StatusEnum).map(value => ({label: value, value: value}))}
            bind:value={statusFilter}
            emptyLabel="tous les statuts"
            buttonClass="btn-secondary py-2"
        />
    </div>
</div>
