<script lang="ts">
    import {CircleArrowDown, CircleArrowUp} from "lucide-svelte";
    import {FilterSortEnum} from "$lib/enums/filter-sort.enum.js";
    import {translate} from "$lib/utils/translator.utils.js";

    type Props = {
        sortField: string;
        sortDirection: 'asc' | 'desc';
    };

    let {
        sortField = $bindable('name'),
        sortDirection = $bindable('asc')
    }: Props = $props();

    function sort(field: string) {
        if (sortField === field) {
            // Même champ : inverser la direction
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            // Nouveau champ : définir à 'asc'
            sortField = field;
            sortDirection = 'asc';
        }
    }
</script>

<div class="flex flex-wrap gap-2">
    {#each Object.values(FilterSortEnum) as field}
        <button type="button" class="btn-secondary py-2 " onclick={() => sort(field)}>
            <span class="text-xs">{translate(field)}</span>
            {#if sortField === field }
                {#if sortDirection === 'desc'}
                    <CircleArrowDown class="size-4"/>
                {:else}
                    <CircleArrowUp class="size-4"/>
                {/if}
            {/if}
        </button>
    {/each}
</div>
