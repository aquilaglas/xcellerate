<script lang="ts">
    // @ts-ignore
    import {CircleArrowDown, CircleArrowUp} from "lucide-svelte";
    import Selector from "$lib/components/ux/Selector.svelte";

    type Props = {
        options: string[];
        colors: Record<string, string | null>;
        value: string;
        title: string;
        disabled?: boolean;
    };

    let {options, colors, value = $bindable(), title, disabled = false}: Props = $props();

    let isOpen = $state(false);
    let refSelector: Selector | undefined = $state();
</script>

<Selector bind:this={refSelector} {options} bind:value={value} bind:isOpen={isOpen}>
    <button class="flex items-center rounded-4xl py-1 px-2 text-green-50 "
            style="background-color:var({colors[value] ?? '--color-black'});"
            type="button" onclick={refSelector.toggleDropdown} title={title}>
        <span class="text-xs">{typeof value === 'string' ? value.toLowerCase() : '?'}</span>
        {#if !disabled}
            {#if isOpen}
                <CircleArrowUp class="ml-2 size-4"/>
            {:else}
                <CircleArrowDown class="ml-2 size-4"/>
            {/if}
        {/if}
    </button>
</Selector>
