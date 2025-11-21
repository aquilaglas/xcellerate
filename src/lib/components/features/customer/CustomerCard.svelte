<script lang="ts">
    import SelectorBadge from "$lib/components/ux/SelectorBadge.svelte";
    import type {Customer} from "$lib/types/models.js";
    import {TypeColorMap, TypeEnum} from "$lib/enums/type.enum.js";
    import {ContainerTypeColorMap, ContainerTypeEnum} from "$lib/enums/container-type.enum.js";
    import {PriorityColorMap, PriorityEnum} from "$lib/enums/priority.enum.js";
    import {StatusColorMap, StatusEnum} from "$lib/enums/status.enum.js";

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
            <SelectorBadge options={Object.values(TypeEnum)} colors={TypeColorMap}
                           bind:value={customerData.type} title="Type" disabled={true}/>
            <SelectorBadge options={Object.values(ContainerTypeEnum)} colors={ContainerTypeColorMap}
                           bind:value={customerData.containerType} title="Type de contenant" disabled={true}/>
            <SelectorBadge options={Object.values(PriorityEnum)} colors={PriorityColorMap}
                           bind:value={customerData.priority} title="Priorité" disabled={true}/>
            <SelectorBadge options={Object.values(StatusEnum)} colors={StatusColorMap}
                           bind:value={customerData.status} title="Statut" disabled={true}/>
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
