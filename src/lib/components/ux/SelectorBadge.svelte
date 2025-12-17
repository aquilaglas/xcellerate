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
        allowEmpty?: boolean;
        emptyLabel?: string;
    };

    let {
        options,
        colors,
        value = $bindable(),
        title,
        disabled = false,
        allowEmpty = false,
        emptyLabel = 'Tous'
    }: Props = $props();

    let isOpen = $state(false);
    let refSelector: Selector | undefined = $state();

    // Ajouter l'option vide si allowEmpty est activé
    const allOptions = $derived(allowEmpty ? [emptyLabel, ...options] : options);

    // Couleur spéciale pour l'état vide
    const displayValue = $derived(value === '' || value === emptyLabel ? emptyLabel : value);
    const displayColor = $derived(
        value === '' || value === emptyLabel ? '--color-gray-400' : (colors[value] ?? '--color-black')
    );

    // Quand l'utilisateur sélectionne l'option vide, on met la valeur à ''
    $effect(() => {
        if (allowEmpty && value === emptyLabel) {
            value = '';
        }
    });
</script>

<Selector bind:this={refSelector} options={allOptions.map(value => ({label: value, value: value}))} bind:selectedValue={value} bind:isOpen={isOpen}>
    <button class="flex items-center rounded-4xl py-1 px-2 text-green-50 "
            style="background-color:var({displayColor});"
            type="button" onclick={refSelector.toggleDropdown} title={title}>
        <span class="text-xs">{typeof displayValue === 'string' ? displayValue.toLowerCase() : '?'}</span>
        {#if !disabled}
            {#if isOpen}
                <CircleArrowUp class="ml-2 size-4"/>
            {:else}
                <CircleArrowDown class="ml-2 size-4"/>
            {/if}
        {/if}
    </button>
</Selector>
