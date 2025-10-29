<script lang="ts">
    // @ts-ignore
    import {CircleX} from "lucide-svelte";

    type Props = {
        showModal: boolean;
        title: string;
        children?: any,
    };

    let {showModal = $bindable(), title, children}: Props = $props();

    let dialog: HTMLDialogElement | undefined = $state();

    $effect(() => {
        if (showModal) dialog?.showModal();
    });
</script>

<dialog
        bind:this={dialog}
        onclose={() => (showModal = false)}
        class="modal"
>
    <div class="flex items-baseline justify-between gap-4 p-4">
        <h2 class="text-2xl font-bold">{title}</h2>
        <button type="button" class="focus:outline-none" onclick={() => dialog?.close()}>
            <CircleX class="btn-link"/>
        </button>
    </div>
    {@render children?.()}
</dialog>
