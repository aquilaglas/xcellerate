<script lang="ts">
    import {importXlsData} from "$lib/utils/xls.utils.js";
    import Modal from "$lib/components/ui/Modal.svelte";
    import {goto} from "$app/navigation";
    import Header from "$lib/components/ui/Header.svelte";

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
<Header>
    <div class="w-full flex justify-center bg-green-700 pt-[40vh] overscroll-none">
        <button type="button" class="clickable-card font-bold" onclick={() => {
        document.getElementById('fileInput')?.click();
    }}>
            <span>Importer un Excel</span>
        </button>
    </div>
</Header>

<Modal bind:showModal title="Importation Excel">
    <div class="flex flex-col gap-4 p-4">
        {#if status === 'loading'}
            <span>Importation en cours...</span>
        {:else if status === 'failed'}
            <span class="text-red-500">Échec de l'importation. Veuillez réessayer.</span>
        {:else if status === 'success'}
            <span>Importation Réussie !</span>
            <button type="button"
                    class="btn-primary"
                    onclick={() => {showModal = false; goto('/customers');}}>
                <span>Continuer</span>
            </button>
        {/if}
    </div>
</Modal>
