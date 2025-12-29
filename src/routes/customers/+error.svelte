<script lang="ts">
    import { page } from '$app/stores';
    import Modal from '$lib/components/ui/Modal.svelte';
    import { goto } from '$app/navigation';

    let showModal = $state(true);

    const errorMessage = $derived($page.error?.message || 'Une erreur inattendue s\'est produite');
    const errorStatus = $derived($page.status || 500);

    async function goHome() {
        showModal = false;
        await goto('/');
    }
</script>

<Modal bind:showModal title="Erreur">
    <div class="flex flex-col gap-4 p-4">
        <div class="flex flex-col gap-2">
            <span class="text-red-500 font-semibold">Status: {errorStatus}</span>
            <span class="text-gray-700 dark:text-gray-300">{errorMessage}</span>
        </div>
        <div class="w-full flex flex-row gap-4">
            <button
                type="button"
                class="btn-primary w-full"
                onclick={goHome}
            >
                <span>Retour à l'accueil</span>
            </button>
        </div>
    </div>
</Modal>
