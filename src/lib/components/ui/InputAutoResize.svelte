<script>
    import {onMount} from "svelte";

    let {
        value = $bindable(),
        placeholder
    } = $props();

    let textarea;
    let mirror;

    function updateHeight() {
        mirror.textContent = value + "\u200b";
        const newHeight = mirror.offsetHeight;

        textarea.style.height = newHeight + "px";
    }

    onMount(() => {
        updateHeight();
    })
</script>

<textarea
        bind:this={textarea}
        bind:value
        oninput={updateHeight}
        placeholder={placeholder}
        class="input w-full resize-none overflow-hidden
  "
        style="height: auto;"
></textarea>

<div
        bind:this={mirror}
        class="input absolute top-0 left-0 whitespace-pre-wrap break-words invisible pointer-events-none
  "
></div>

<style>
    div[bind\:this] {
        white-space: pre-wrap;
    }
</style>
