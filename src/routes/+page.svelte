<script lang="ts">
    import {importXlsData} from "$lib/utils/xls.utils.js";
    import Modal from "$lib/components/ui/Modal.svelte";
    import Header from "$lib/components/ui/Header.svelte";
    import {goToCustomers} from "$lib/utils/navigation.utils.js";
    import {StatusEnum} from "$lib/enums/status.enum.js";

    let status: StatusEnum = $state(StatusEnum.LOADING);

    let showModal = $state(false);

    async function handleImport(event: Event) {
        status = StatusEnum.LOADING;
        showModal = true;
        status = await importXlsData(event);

        if (status === StatusEnum.ERROR) {
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
        <button type="button" class="clickable-card font-bold -translate-y-[28px]"
                onclick={() => document.getElementById('fileInput')?.click()}>
            <span>Importer un Excel</span>
        </button>
    </div>
</Header>

<Modal bind:showModal title="Importation Excel">
    <div class="flex flex-col gap-4 p-4">
        {#if status === 'loading'}
            <span>Importation en cours...</span>
        {:else if status === StatusEnum.ERROR}
            <span class="text-red-500">Échec de l'importation. Veuillez réessayer.</span>
        {:else if status === StatusEnum.SUCCESS}
            <span>Importation Réussie !</span>
            <button type="button"
                    class="btn-primary"
                    onclick={async () => {showModal = false; await goToCustomers();}}>
                <span>Continuer</span>
            </button>
        {/if}
    </div>
</Modal>
