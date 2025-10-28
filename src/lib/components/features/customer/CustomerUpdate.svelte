<script lang="ts">
    import {updateCustomer} from "$lib/utils/customer.utils.js";
    import {
        containerTypeColorOptions,
        type Customer,
        priorityColorOptions, statusColorOptions,
        typeColorOptions
    } from "$lib/types/customer.types.js";
    import SelectorBadge from "$lib/components/ux/SelectorBadge.svelte";
    import {CirclePlus, Trash2, X} from "lucide-svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import FormInputDefault from "$lib/components/ux/forms/FormInputDefault.svelte";
    import FormInputArray from "$lib/components/ux/forms/FormInputArray.svelte";

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
        updateCustomer(formData).then(() => {
        });
    });
</script>

{#if isInitialized}
    <div class="flex justify-between items-center px-4">
        <h2 class="text-2xl font-bold mt-4 mb-2">Données principales</h2>
        <button class="bg-white h-fit rounded-2xl hover:bg-gray-500 active:bg-gray-500 p-1"
                onclick={() => goto('/customers/')}>
            <X class="text-black"/>
        </button>
    </div>
    <form class="w-full flex flex-col p-4 pt-0">
        <div class="w-full flex flex-col gap-4">
            <div class="flex flex-wrap bg-white text-left p-4 rounded-2xl gap-2 sm:gap-0">
                <div class="flex gap-2 sm:pr-2 sm:border-r-2 border-black">
                    <span class="hidden md:block text-black font-medium">Type:</span>
                    <SelectorBadge options={typeColorOptions} bind:value={formData.type} title="Type"/>
                </div>
                <div class="flex gap-2 sm:px-2 sm:border-r-2 border-black">
                    <span class="hidden md:block text-black font-medium">Type de contenant:</span>
                    <SelectorBadge options={containerTypeColorOptions} bind:value={formData.containerType}
                                   title="Type de contenant"/>
                </div>
                <div class="flex gap-2 sm:px-2 sm:border-r-2 border-black">
                    <span class="hidden md:block text-black font-medium">Priorité:</span>
                    <SelectorBadge options={priorityColorOptions} bind:value={formData.priority} title="Priorité"/>
                </div>
                <div class="flex gap-2 sm:pl-2">
                    <span class="hidden md:block text-black font-medium">Statut:</span>
                    <SelectorBadge options={statusColorOptions} bind:value={formData.status} title="Statut"/>
                </div>
            </div>

            <FormInputDefault bind:value={formData.name} title="Nom"/>
            <FormInputArray bind:value={formData.addresses} title="Adresse" isFeminine={true}/>
            <FormInputArray bind:value={formData.contacts} title="Contact"/>
            <FormInputDefault bind:value={formData.lastCommunication} title="Dernière communication"/>
            <FormInputArray bind:value={formData.comments} title="Commentaire"/>
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
                        class="flex justify-center items-center uppercase bg-black hover:bg-gray-700 active:bg-gray-700 rounded-lg sm:p-2 h-[42px]">
                    <span class="hidden sm:block text-white font-bold">Ajouter une colonne</span>
                    <CirclePlus class="block sm:hidden ml-2 size-4"/>
                </button>
            </div>
        </div>
    </form>
{/if}
