<script lang="ts">
    import SortButtons from "$lib/components/ux/SortButtons.svelte";
    import CustomerFilters from "$lib/components/ux/CustomerFilters.svelte";

    type Props = {
        nameFilter: string;
        typeFilter: string;
        containerTypeFilter: string;
        priorityFilter: string;
        statusFilter: string;
        sortField: string;
        sortDirection: 'asc' | 'desc';
    };

    let {
        nameFilter = $bindable(),
        typeFilter = $bindable(),
        containerTypeFilter = $bindable(),
        priorityFilter = $bindable(),
        statusFilter = $bindable(),
        sortField = $bindable(),
        sortDirection = $bindable()
    }: Props = $props();
</script>

<div class="flex flex-col gap-4">
    <CustomerFilters
        bind:nameFilter
        bind:typeFilter
        bind:containerTypeFilter
        bind:priorityFilter
        bind:statusFilter
    />
    <SortButtons
        bind:sortField
        bind:sortDirection
    />
</div>
