<script lang="ts">
    // @ts-ignore
    import {CircleX} from "lucide-svelte";
    import type {PageProps} from './$types';
    import CustomerUpdate from "$lib/components/features/customer/CustomerUpdate.svelte";
    import Header from "$lib/components/ui/Header.svelte";
    import {goBackCustomers} from "$lib/utils/navigation.utils.js";

    const {data}: PageProps = $props();
</script>

<Header>
    <div class="w-full flex justify-end z-50">
        <button type="button" onclick={goBackCustomers}>
            <CircleX class="btn-link size-8"/>
        </button>
    </div>

    <CustomerUpdate customer={data.customer}/>
</Header>
