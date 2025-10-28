<script lang="ts">
    import {importXlsData} from "$lib/utils/xls.utils.js";
    import Modal from "$lib/components/ui/Modal.svelte";
    import {goto} from "$app/navigation";

    let status: "success" | "failed" | "loading" = $state("loading");

    let showModal = $state(false);

    async function handleImport(event: Event) {
        status = "loading";
        showModal = true;
        status = await importXlsData(event);

        if (status === "failed") {
            console.error("Erreur lors de l'importation du fichier Excel.");
        }
    }
</script>

<input
        id="fileInput"
        type="file"
        accept=".xlsx, .xls"
        class="hidden"
        onchange={handleImport}
/>

<div class="h-full w-full flex items-center justify-center">
    <button type="button" class="bg-black hover:bg-gray-700 items-center rounded-lg p-4 w-100 m-4" onclick={() => {
        document.getElementById('fileInput')?.click();
    }}>
        <span class="text-white font-bold">Importer un Excel</span>
    </button>
</div>

<Modal bind:showModal title="Importation Excel">
    <div class="flex flex-col gap-4 p-4">
        {#if status === 'loading'}
            <span>Importation en cours...</span>
        {:else if status === 'failed'}
            <span class="text-red-500">Échec de l'importation. Veuillez réessayer.</span>
        {:else if status === 'success'}
            <span>Importation Réussie !</span>
            <button type="button"
                    class="uppercase bg-black hover:bg-gray-700 items-center rounded-lg p-4"
                    onclick={() => {showModal = false; goto('/customers');}}>
                <span class="text-white font-bold">Continuer</span>
            </button>
        {/if}
    </div>
</Modal>
