<script lang="ts">
    import {CircleArrowDown, CircleArrowUp} from "lucide-svelte";
    import type {SortDirection, SortField} from "$lib/types/sort.types.js";
    import {toggleSort} from "$lib/utils/sort.utils.js";
    import {goto} from "$app/navigation";

    type Props = {
        sortField: SortField;
        sortDirection: SortDirection;
        field: SortField;
        title: string;
    };

    let {
        sortField,
        sortDirection,
        field,
        title,
    }: Props = $props();

    async function sort() {
        const toggleData = toggleSort(field, sortField, sortDirection);
        await goto('/customers?sortField=' + toggleData?.field + '&sortDirection=' + toggleData?.direction);
        window.location.reload();
    }
</script>

<button type="button" class="btn-secondary py-2 " onclick={() => sort()}>
    <span class="text-xs">{title}</span>
    {#if sortField === field && sortDirection === 'asc'}
        <CircleArrowUp class="size-4"/>
    {:else if sortField === field && sortDirection === 'desc'}
        <CircleArrowDown class="size-4"/>
    {/if}
</button>