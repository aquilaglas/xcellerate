<script lang="ts">
    import type {Customer} from "$lib/types/models.js";
    import {TypeColorMap, TypeEnum} from "$lib/enums/type.enum.js";
    import {ContainerTypeColorMap, ContainerTypeEnum} from "$lib/enums/container-type.enum.js";
    import {PriorityColorMap, PriorityEnum} from "$lib/enums/priority.enum.js";
    import {StatusColorMap, StatusEnum} from "$lib/enums/status.enum.js";
    import Selector from "$lib/components/ux/Selector.svelte";
    import {formatDateFr} from "$lib/utils/date.utils.js";

    type Props = {
        customer: Customer;
    };

    const {customer}: Props = $props();
</script>

<a href="/customers/{customer.id}" class="clickable-card">
    <span class="text-4xl mb-4">{customer.name && customer.name !== '' ? customer.name : '?'}</span>

    <div class="mb-2">
        <span class="text-gray-500 dark:text-gray-300 text-lg">{formatDateFr(customer.lastCommunication)}</span>
        <div class="flex flex-wrap gap-2">
            <Selector options={Object.values(TypeEnum).map(value => ({label: value, value: value}))}
                      colors={TypeColorMap} value={customer.type} title="Type" disabled={true}
                      buttonClass="flex items-center rounded-4xl py-1 px-2 text-green-50 text-xs"/>
            <Selector options={Object.values(ContainerTypeEnum).map(value => ({label: value, value: value}))}
                      colors={ContainerTypeColorMap} value={customer.containerType} title="Type de contenant" disabled={true}
                      buttonClass="flex items-center rounded-4xl py-1 px-2 text-green-50 text-xs"/>
            <Selector options={Object.values(PriorityEnum).map(value => ({label: value, value: value}))}
                      colors={PriorityColorMap} value={customer.priority} title="Priorité" disabled={true}
                      buttonClass="flex items-center rounded-4xl py-1 px-2 text-green-50 text-xs"/>
            <Selector options={Object.values(StatusEnum).map(value => ({label: value, value: value}))}
                      colors={StatusColorMap} value={customer.status} title="Statut" disabled={true}
                      buttonClass="flex items-center rounded-4xl py-1 px-2 text-green-50 text-xs"/>
        </div>
    </div>

    <div class="flex flex-col border-b border-b-gray-900 dark:border-b-gray-300 py-1">
        <div class="flex flex-wrap gap-2 gap-y-0">
            <span class="text-green-700 font-bold text-xl">Adresses:</span>
            <span class="text-lg truncate">{customer.addresses.length}</span>
        </div>
        <div class="text-lg truncate">
            {#each customer.addresses as address, index}
                {@const isLast = index === customer.addresses.length - 1}
                <span>{address}{isLast ? '' : ', '}</span>
            {/each}
        </div>
    </div>

    <!-- @TODO bouton voir les contacts -->
    <div class="flex flex-col border-b border-b-gray-900 dark:border-b-gray-300 py-1">
        <div class="flex flex-wrap gap-2 gap-y-0">
            <span class="text-green-700 font-bold text-xl">Contacts:</span>
            <span class="text-lg truncate">{customer.contacts.length}</span>
        </div>
        <div class="text-lg truncate">
            {#each customer.contacts as address, index}
                {@const isLast = index === customer.contacts.length - 1}
                <span>{address}{isLast ? '' : ', '}</span>
            {/each}
        </div>
    </div>

    <!-- @TODO bouton voir les commentaires -->
    <div class="flex flex-col pt-1">
        <div class="flex flex-wrap gap-2 gap-y-0">
            <span class="text-green-700 font-bold text-xl">Commentaires:</span>
            <span class="text-lg truncate">{customer.comments.length}</span>
        </div>
        <div class="text-lg truncate">
            {#each customer.comments as address, index}
                {@const isLast = index === customer.comments.length - 1}
                <span>{address}{isLast ? '' : ', '}</span>
            {/each}
        </div>
    </div>
</a>
