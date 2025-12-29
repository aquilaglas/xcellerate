<script lang="ts">
    // @ts-ignore
    import {CircleX} from "lucide-svelte";
    import type {PageProps} from './$types.js';
    import CustomerUpdate from "$lib/components/features/customer/CustomerUpdate.svelte";
    import Header from "$lib/components/ui/Header.svelte";
    import {goBackCustomers} from "$lib/utils/navigation.utils.js";

    const {data}: PageProps = $props();
</script>

<Header>
    <div class="w-full flex justify-end z-10 p-6 relative">
        <button type="button" onclick={goBackCustomers}>
            <CircleX class="btn-link size-8"/>
        </button>
    </div>

    <div class="-mt-15 z-0">
        <CustomerUpdate customer={data.customer}/>
    </div>
</Header>
