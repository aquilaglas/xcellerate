<script lang="ts">
    // @ts-ignore
    import {CirclePlus} from "lucide-svelte";
    import {deleteCustomer, updateCustomer} from "$lib/utils/customer.utils.js";
    import SelectorBadge from "$lib/components/ux/SelectorBadge.svelte";
    import {onMount} from "svelte";
    import FormInputDefault from "$lib/components/ux/forms/FormInputDefault.svelte";
    import FormInputArray from "$lib/components/ux/forms/FormInputArray.svelte";
    import Modal from "$lib/components/ui/Modal.svelte";
    import InputAutoResize from "$lib/components/ui/InputAutoResize.svelte";
    import {TypeColorMap, TypeEnum} from "$lib/enums/type.enum.js";
    import {ContainerTypeColorMap, ContainerTypeEnum} from "$lib/enums/container-type.enum.js";
    import {PriorityColorMap, PriorityEnum} from "$lib/enums/priority.enum.js";
    import {StatusColorMap, StatusEnum} from "$lib/enums/status.enum.js";
    import type {Customer} from "$lib/types/models.js";
    import {goBackCustomers} from "$lib/utils/navigation.utils.js";

    type Props = {
        customer: Customer;
    };

    let {customer}: Props = $props();

    let isInitialized = $state(false);
    let original = $state<Customer>(customer);
    let formData = $state<Customer>(customer);
    let showModal = $state(false);

    async function onDelete() {
        showModal = false;
        await deleteCustomer(customer.id);
        await goBackCustomers();
    }

    function getDiff(original: any, updated: any): any {
        const result: any = {};

        for (const key in updated) {
            const o = original[key];
            const u = updated[key];

            if (Array.isArray(o) && Array.isArray(u)) {
                if (JSON.stringify(o) !== JSON.stringify(u)) {
                    result[key] = u;
                }
                continue;
            }
            if (typeof o === "object" && typeof u === "object" && o !== null && u !== null) {
                const nested = getDiff(o, u);
                if (Object.keys(nested).length > 0) {
                    result[key] = nested;
                }
                continue;
            }
            if (o !== u) {
                result[key] = u;
            }
        }
        return result;
    }

    onMount(() => {
        original = customer;
        formData = customer;
        isInitialized = true;
    });

    $effect(() => {
        if (!isInitialized) return;
        updateCustomer(getDiff(original, formData), customer.id).then(() => {
        });
    });
</script>

<Modal bind:showModal title="Supression client">
    <div class="flex flex-col gap-4 p-4">
        <span class="text-red-500">Êtes-vous sûr de vouloir supprimer ce client ?</span>
        <div class="w-full flex flex-row gap-4">
            <button type="button"
                    class="btn-danger w-full"
                    onclick={() => onDelete()}>
                <span>Oui</span>
            </button>
            <button type="button"
                    class="btn-primary w-full"
                    onclick={() => showModal = false}>
                <span>Non</span>
            </button>
        </div>
    </div>
</Modal>

{#if isInitialized}
    <form class="w-full flex flex-col p-4 pt-0">
        <h2 class="text-2xl font-bold mt-6 mb-2">Données principales</h2>
        <div class="w-full flex flex-col gap-4">
            <div class="card flex-row flex-wrap gap-2 sm:gap-0">
                <div class="flex gap-2 sm:pr-2 sm:border-r-2 border-gray-900 dark:border-green-50">
                    <span class="hidden md:block">Type:</span>
                    <SelectorBadge options={Object.values(TypeEnum)} colors={TypeColorMap}
                                   bind:value={formData.type} title="Type"/>
                </div>
                <div class="flex gap-2 sm:px-2 sm:border-r-2 border-gray-900 dark:border-green-50">
                    <span class="hidden md:block">Type de contenant:</span>
                    <SelectorBadge options={Object.values(ContainerTypeEnum)} colors={ContainerTypeColorMap}
                                   bind:value={formData.containerType} title="Type de contenant"/>
                </div>
                <div class="flex gap-2 sm:px-2 sm:border-r-2 border-gray-900 dark:border-green-50">
                    <span class="hidden md:block">Priorité:</span>
                    <SelectorBadge options={Object.values(PriorityEnum)} colors={PriorityColorMap}
                                   bind:value={formData.priority} title="Priorité"/>
                </div>
                <div class="flex gap-2 sm:pl-2">
                    <span class="hidden md:block">Statut:</span>
                    <SelectorBadge options={Object.values(StatusEnum)} colors={StatusColorMap}
                                   bind:value={formData.status} title="Statut"/>
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
            {#if formData.otherData}
                {#each Object.entries(formData.otherData) as [key, _]}
                    <label class="flex flex-col">
                        <span class="font-medium">{key}</span>
                        <InputAutoResize bind:value={formData.otherData[key]}
                                         placeholder="Ajouter: {key.toLowerCase()}"/>
                    </label>
                {/each}
            {/if}
            <div class="flex flex-col">
                <span class="font-medium">Nouvelle colonne</span>
                <button type="button"
                        class="btn-primary h-[42px]">
                    <span class="hidden sm:block">Ajouter une colonne</span>
                    <CirclePlus class="block sm:hidden ml-2 size-4"/>
                </button>
            </div>
        </div>

        <button type="button" class="btn-danger mt-10" onclick={() => showModal = true}>
            <span>Supprimer le client</span>
        </button>
    </form>
{/if}
