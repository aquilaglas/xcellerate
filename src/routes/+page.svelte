<script lang="ts">
    import Modal from "$lib/components/ui/Modal.svelte";
    import Header from "$lib/components/ui/Header.svelte";
    import {type ImportResult, importXlsData} from "$lib/utils/xls.utils.js";
    import {goto} from "$app/navigation";
    import {setLoading} from "$lib/stores/loader.store.js";

    let showModal = $state(false);
    let result: ImportResult = $state({
        createdSheets: 0,
        createdCustomers: 0,
        errors: []
    });

    async function handleClick() {
        showModal = false;
        goto('/customers');
    }

    async function handleImport(event: Event) {
        setLoading(true);
        result = await importXlsData(event);

        console.log(
            `${result.createdSheets} page${result.createdSheets > 1 ? 's' : ''} et ${result.createdCustomers} client${result.createdCustomers > 1 ? 's' : ''} créés`
        );

        for (const error of result.errors) {
            console.error(
                error.message,
                error.sheetName ? 'nom de la page: ' + error.sheetName : "",
                error.rowIndex ? 'numéro de ligne: ' + error.rowIndex : ""
            );
        }
        setLoading(false);
        showModal = true;
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
        {#if result.createdSheets === 0}
            <span class="text-red-500">
                Échec de l'importation {result.errors.length} erreurs. Veuillez réessayer.
            </span>
        {:else}
            <span>Importation Réussie ! {result.createdCustomers} client{result.createdCustomers > 1 ? 's' : ''}
                ajouté{result.createdCustomers > 1 ? 's' : ''}.</span>
            <button type="button"
                    class="btn-primary"
                    onclick={handleClick}>
                <span>Continuer</span>
            </button>
        {/if}
    </div>
</Modal>
