<script lang="ts">
    // @ts-ignore
    import {CircleX} from "lucide-svelte";

    let { showModal = $bindable(), title, children } = $props();

    let dialog: HTMLDialogElement | undefined = $state();

    $effect(() => {
        if (showModal) dialog?.showModal();
    });
</script>

<dialog
        bind:this={dialog}
        onclose={() => (showModal = false)}
        class="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto items-center align-middle rounded-2xl"
>
    <div class="w-fit h-fit">
        <div class="flex items-baseline justify-between gap-4 p-4">
            <h2 class="text-2xl font-bold">{title}</h2>
            <button type="button" class="focus:outline-none" onclick={() => dialog?.close()}>
                <CircleX class="hover:text-gray-500 active:text-gray-500"/>
            </button>
        </div>
        {@render children?.()}
    </div>
</dialog>
