<script lang="ts">
    import {
        containerTypeColorOptions,
        type Customer,
        priorityColorOptions, statusColorOptions,
        typeColorOptions
    } from "$lib/types/customer.types.js";
    import SelectorBadge from "$lib/components/ux/SelectorBadge.svelte";

    type Props = {
        customer: Customer;
        renderers?: Record<string, any>;
    };

    const {customer}: Props = $props();

    let customerData = $state<Customer>(customer);
</script>


<a href="/customers/{customerData.id}"
   class="bg-white hover:bg-gray-300 text-left h-full w-full p-4 rounded-2xl flex flex-col">
    <span class="text-black font-bold text-4xl mb-4">{customerData.name && customerData.name !== '' ? customerData.name : '?'}</span>

    <div class="mb-2">
        <span class="text-gray-500 text-lg">{customerData.lastCommunication ?? '?'}</span>
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

    <div class="grid grid-cols-2 md:grid-cols-1 gap-x-4">
        {#if customerData.addresses.length > 0}
            <div class="flex flex-col">
                <span class="text-green-800 font-bold text-xl">Adresses:</span>
                <div class="text-black text-lg truncate">
                    {#each customerData.addresses as address, index}
                        {@const isLast = index === customerData.addresses.length - 1}
                        <span>{address}{isLast ? '' : ', '}</span>
                    {/each}
                </div>
            </div>
        {/if}

        <div class="flex flex-col">
            <span class="text-green-800 font-bold text-xl">Contacts:</span>
            <span class="text-black text-lg">{customerData.contacts.length}</span>
            <!-- @TODO boutton voir les contacts -->
        </div>

        {#if customerData.containerType}
            <div class="flex flex-col">
                <span class="text-green-800 font-bold text-xl">Contenant:</span>
                <span class="text-black text-lg">{customerData.containerType}</span>
            </div>
        {/if}

        {#if customerData.status}
            <div class="flex flex-col">
                <span class="text-green-800 font-bold text-xl">Status:</span>
                <span class="text-black text-lg">{customerData.status ?? '?'}</span>
            </div>
        {/if}

        {#if customerData.lastCommunication}
            <div class="flex flex-col">
                <span class="text-green-800 font-bold text-xl">Dernière communication:</span>
                <span class="text-black text-lg">{customerData.lastCommunication ?? '?'}</span>
            </div>
        {/if}

        <div class="flex flex-col">
            <span class="text-green-800 font-bold text-xl">Priorité:</span>
            <span class="text-black text-lg">{customerData.priority}</span>
        </div>

        <div class="flex flex-col">
            <span class="text-green-800 font-bold text-xl">Commentaires:</span>
            <span class="text-black text-lg">{customerData.comments.length}</span>
            <!-- @TODO boutton voir les commentaires -->
        </div>
    </div>
</a>
