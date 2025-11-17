<script lang="ts">
    import {CircleArrowDown, CircleArrowUp} from "lucide-svelte";
    import {toggleSort} from "$lib/utils/filter-sort.utils.js";
    import {FilterSortEnum} from "$lib/enums/filter-sort.enum.js";
    import {translate} from "$lib/utils/translator.utils.js";
    import {goToCustomers} from "$lib/utils/navigation.utils.js";
    import type {SearchParams} from "$lib/types/filter-sort.types.js";

    type Props = {
        searchParams: SearchParams;
    };

    let {
        searchParams,
    }: Props = $props();

    async function sort(field: string) {
        const updatedSearchParams = toggleSort(field, searchParams);
        await goToCustomers(updatedSearchParams);
        window.location.reload();
    }
</script>

<div class="flex flex-wrap gap-2">
    {#each Object.values(FilterSortEnum) as field}
        <button type="button" class="btn-secondary py-2 " onclick={() => sort(field)}>
            <span class="text-xs">{translate(field)}</span>
            {#if searchParams['sortField'] === field }
                {#if searchParams['sortDirection'] === 'desc'}
                    <CircleArrowDown class="size-4"/>
                {:else}
                    <CircleArrowUp class="size-4"/>
                {/if}
            {/if}
        </button>
    {/each}
</div>
