<script lang="ts">
    import type { PageProps } from './$types';
    import CustomerUpdate from "$lib/components/features/customer/CustomerUpdate.svelte";

    const {data}: PageProps = $props();
</script>

<div class="w-full">
    <CustomerUpdate customer={data.customer} />
</div>