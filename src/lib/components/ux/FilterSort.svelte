<script lang="ts">
    import SortButtons from "$lib/components/ux/SortButtons.svelte";
    import SearchBar from "$lib/components/ux/forms/SearchBar.svelte";
    import type {SearchParams} from "$lib/types/filter-sort.types.js";

    type Props = {
        searchParams: SearchParams;
    };

    let {
        searchParams,
    }: Props = $props();
</script>

<SearchBar {searchParams}/>
<SortButtons {searchParams}/>
