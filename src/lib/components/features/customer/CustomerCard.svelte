<script lang="ts">
    import {
        containerTypeColorOptions,
        type Customer,
        priorityColorOptions, statusColorOptions,
        typeColorOptions
    } from "$lib/types/customer.types.js";
    import SelectorBadge from "$lib/components/ux/SelectorBadge.svelte";
    import {goto} from "$app/navigation";

    type Props = {
        customer: Customer;
        renderers?: Record<string, any>;
    };

    const {customer}: Props = $props();

    let customerData = $state<Customer>(customer);
</script>

<a href="/customers/{customerData.id}"
   class="clickable-card">
    <span class="text-4xl mb-4">{customerData.name && customerData.name !== '' ? customerData.name : '?'}</span>

    <div class="mb-2">
        <span class="text-gray-500 dark:text-gray-300 text-lg">{customerData.lastCommunication ?? '?'}</span>
        <div class="flex flex-wrap gap-2">
            <SelectorBadge options={typeColorOptions} bind:value={customerData.type} title="Type" disabled={true}/>
            <SelectorBadge options={containerTypeColorOptions} bind:value={customerData.containerType}
                           title="Type de contenant" disabled={true}/>
            <SelectorBadge options={priorityColorOptions} bind:value={customerData.priority} title="Priorité"
                           disabled={true}/>
            <SelectorBadge options={statusColorOptions} bind:value={customerData.status} title="Statut"
                           disabled={true}/>
        </div>
    </div>

    <div class="flex flex-col border-b border-b-gray-900 dark:border-b-gray-300 py-1">
        <div class="flex flex-wrap gap-2 gap-y-0">
            <span class="text-green-700 font-bold text-xl">Adresses:</span>
            <span class="text-lg truncate">{customerData.addresses.length}</span>
        </div>
        <div class="text-lg truncate">
            {#each customerData.addresses as address, index}
                {@const isLast = index === customerData.addresses.length - 1}
                <span>{address}{isLast ? '' : ', '}</span>
            {/each}
        </div>
    </div>

    <!-- @TODO boutton voir les contacts -->
    <div class="flex flex-col border-b border-b-gray-900 dark:border-b-gray-300 py-1">
        <div class="flex flex-wrap gap-2 gap-y-0">
            <span class="text-green-700 font-bold text-xl">Contacts:</span>
            <span class="text-lg truncate">{customerData.contacts.length}</span>
        </div>
        <div class="text-lg truncate">
            {#each customerData.contacts as address, index}
                {@const isLast = index === customerData.contacts.length - 1}
                <span>{address}{isLast ? '' : ', '}</span>
            {/each}
        </div>
    </div>

    <!-- @TODO boutton voir les commentaires -->
    <div class="flex flex-col pt-1">
        <div class="flex flex-wrap gap-2 gap-y-0">
            <span class="text-green-700 font-bold text-xl">Commentaires:</span>
            <span class="text-lg truncate">{customerData.comments.length}</span>
        </div>
        <div class="text-lg truncate">
            {#each customerData.comments as address, index}
                {@const isLast = index === customerData.comments.length - 1}
                <span>{address}{isLast ? '' : ', '}</span>
            {/each}
        </div>
    </div>
</a>
