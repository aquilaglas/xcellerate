<script lang="ts">
    // @ts-ignore
    import { X } from "lucide-svelte";
    import SelectorBadge from "./SelectorBadge.svelte";
    import { translate } from "$lib/utils/translator.utils.js";
    import { TypeEnum, TypeColorMap } from "$lib/enums/type.enum.js";
    import { ContainerTypeEnum, ContainerTypeColorMap } from "$lib/enums/container-type.enum.js";
    import { PriorityEnum, PriorityColorMap } from "$lib/enums/priority.enum.js";
    import { StatusEnum, StatusColorMap } from "$lib/enums/status.enum.js";

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

    // Compter le nombre de filtres actifs
    const activeFiltersCount = $derived(
        [nameFilter, typeFilter, containerTypeFilter, priorityFilter, statusFilter]
            .filter(f => f && f !== '').length
    );
</script>

<div class="flex flex-col gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
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
        <!-- Filtre nom (texte) -->
        <input
            type="text"
            placeholder="Rechercher par {translate('name')}"
            bind:value={nameFilter}
            class="input flex-1 min-w-[200px]"
        />

        <!-- Filtre type -->
        <SelectorBadge
            options={Object.values(TypeEnum)}
            colors={TypeColorMap}
            bind:value={typeFilter}
            title={translate('type')}
            allowEmpty={true}
            emptyLabel="Tous types"
        />

        <!-- Filtre containerType -->
        <SelectorBadge
            options={Object.values(ContainerTypeEnum)}
            colors={ContainerTypeColorMap}
            bind:value={containerTypeFilter}
            title={translate('containerType')}
            allowEmpty={true}
            emptyLabel="Tous"
        />

        <!-- Filtre priority -->
        <SelectorBadge
            options={Object.values(PriorityEnum)}
            colors={PriorityColorMap}
            bind:value={priorityFilter}
            title={translate('priority')}
            allowEmpty={true}
            emptyLabel="Toutes"
        />

        <!-- Filtre status -->
        <SelectorBadge
            options={Object.values(StatusEnum)}
            colors={StatusColorMap}
            bind:value={statusFilter}
            title={translate('status')}
            allowEmpty={true}
            emptyLabel="Tous"
        />
    </div>
</div>
