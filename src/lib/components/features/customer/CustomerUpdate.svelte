<script lang="ts">
    import {updateCustomer} from "$lib/utils/customer.utils.js";
    import {
        containerTypeColorOptions,
        type Customer,
        priorityColorOptions, statusColorOptions,
        typeColorOptions
    } from "$lib/types/customer.types.js";
    import SelectorBadge from "$lib/components/ux/SelectorBadge.svelte";
    import {Trash2, X} from "lucide-svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    type Props = {
        customer: Customer;
    };

    let {customer}: Props = $props();

    let formData = $state<Customer>(customer);
    let isInitialized = $state(false);

    function addAddress() {
        formData.addresses.push('');
    }

    function removeAddress(index: number) {
        formData.addresses.splice(index, 1);
    }

    onMount(() => {
        formData = {
            ...customer,
            addresses: [...customer.addresses]
        };
        isInitialized = true;
    });

    $effect(() => {
        if (!isInitialized) return;
        updateCustomer(formData).then(() => {});
    });
</script>

{#if isInitialized}
    <div class="flex justify-between items-center px-4">
        <h2 class="text-2xl font-bold mt-4 mb-2">Données principales</h2>
        <button class="bg-white h-fit rounded-2xl hover:bg-gray-500 p-1" onclick={() => goto('/customers/')}><X class="text-black"/></button>
    </div>
    <form class="w-full flex flex-col p-4 pt-0">
        <div class="w-full flex flex-col gap-4">
            <div class="flex flex-wrap bg-white text-left p-4 rounded-2xl">
                <div class="flex gap-2 pr-2 border-r-2 border-black">
                    <span class="hidden md:block text-black font-medium">Type:</span>
                    <SelectorBadge options={typeColorOptions} bind:value={formData.type} title="Type" />
                </div>
                <div class="flex gap-2 px-2 border-r-2 border-black">
                    <span class="hidden md:block text-black font-medium">Type de contenant:</span>
                    <SelectorBadge options={containerTypeColorOptions} bind:value={formData.containerType} title="Type de contenant" />
                </div>
                <div class="flex gap-2 px-2 border-r-2 border-black">
                    <span class="hidden md:block text-black font-medium">Priorité:</span>
                    <SelectorBadge options={priorityColorOptions} bind:value={formData.priority} title="Priorité" />
                </div>
                <div class="flex gap-2 pl-2">
                    <span class="hidden md:block text-black font-medium">Statut:</span>
                    <SelectorBadge options={statusColorOptions} bind:value={formData.status} title="Statut" />
                </div>
            </div>

            <label class="flex flex-col bg-white text-left p-4 rounded-2xl">
                <span class="text-black font-medium">Nom</span>
                <input
                        bind:value={formData.name}
                        class="p-2 rounded-lg text-black focus:ring-0 focus:outline-none border-black border-4"
                        placeholder="Ajouter: Nom"
                />
            </label>

            <label class="flex flex-col bg-white text-left p-4 rounded-2xl">
                <span class="text-black font-medium">Adresses</span>
                <span class="flex flex-col gap-2">
                {#each formData.addresses as _, index}
                    <div class="flex gap-2">
                        <input
                                bind:value={formData.addresses[index]}
                                class="w-full p-2 rounded-lg text-black focus:ring-0 focus:outline-none border-black border-4"
                                placeholder="Ajouter: Addresse"
                        />
                        <button type="button" onclick={() => removeAddress(index)}
                                class="flex items-center justify-evenly w-[48px] h-[48px] p-2 rounded-lg bg-red-500 hover:bg-red-700">
                            <Trash2/>
                        </button>
                    </div>
                {/each}
                    <button type="button"
                            onclick={addAddress}
                            class="uppercase bg-black hover:bg-gray-700 rounded-lg p-2 h-[48px]">
                    <span class="text-white font-bold">Ajouter une addresse</span>
                </button>
            </span>
            </label>

            <div class="flex flex-col bg-white text-left p-4 rounded-2xl">
                <span class="text-black font-medium">Contacts</span>
            </div>

            <label class="flex flex-col bg-white text-left p-4 rounded-2xl">
                <span class="text-black font-medium">Dernière communication</span>
                <input
                        bind:value={formData.lastCommunication}
                        class="p-2 rounded-lg text-black focus:ring-0 focus:outline-none border-black border-4"
                        placeholder="Ajouter: Dernière communication"
                />
            </label>

            <div class="flex flex-col bg-white text-left p-4 rounded-2xl">
                <span class="text-black font-medium">Commentaires</span>
            </div>
        </div>

        <h2 class="text-2xl font-bold mt-8 mb-2">Données secondaires</h2>
        <div class="grid grid-cols-2 gap-4">
            {#each Object.entries(formData.otherData) as [key, _]}
                <label class="flex flex-col">
                    <span class="font-medium">{key}</span>
                    <input
                            bind:value={formData.otherData[key]}
                            class="p-2 rounded-lg text-black focus:ring-black focus:border-none focus:outline-none focus:ring-4"
                            placeholder="Ajouter: {key.toLowerCase()}"
                    />
                </label>
            {/each}
            <div class="flex flex-col">
                <span class="font-medium">Nouvelle colonne</span>
                <button type="button"
                        class="uppercase bg-black hover:bg-gray-700 rounded-lg p-2 h-[42px]">
                    <span class="text-white font-bold">Ajouter une colonne</span>
                </button>
            </div>
        </div>
    </form>
{/if}
