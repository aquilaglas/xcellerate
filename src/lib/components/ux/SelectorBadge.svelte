<script lang="ts">
    import {CircleArrowDown, CircleArrowUp} from "lucide-svelte";

    type Props = {
        options: Record<string, string | null>;
        value: string;
        title: string;
        disabled?: boolean;
    };

    let {options, value = $bindable(), title, disabled = false}: Props = $props();

    let isOpen = $state(false);

    function toggleDropdown() {
        if (!disabled) {
            isOpen = !isOpen;
        }
    }

    function selectOption(option: string) {
        value = option;
        isOpen = false;
    }

    function clickOutside(node: HTMLElement) {
        const handleClick = (event: MouseEvent) => {
            if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
                node.dispatchEvent(new CustomEvent('clickoutside'));
            }
        };

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }
</script>

<div use:clickOutside onclickoutside={() => isOpen = false} class="relative">
    <button class="flex items-center rounded-4xl py-1 px-2 text-green-50 "
            style="background-color:var({options[value] ?? '--color-black'});"
            type="button" onclick={toggleDropdown} title={title}>
        <span class="text-xs">{value ? value.toLowerCase() : '?'}</span>
        {#if !disabled}
            {#if isOpen}
                <CircleArrowUp class="ml-2 size-4"/>
            {:else}
                <CircleArrowDown class="ml-2 size-4"/>
            {/if}
        {/if}
    </button>
    {#if isOpen}
        <div class="absolute z-10 w-fit mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {#each Object.keys(options) as option}
                {#if option !== value}
                    <button type="button" onclick={() => selectOption(option)}
                            class="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-800 transition-colors">
                        {option}
                    </button>
                {/if}
            {/each}

            {#if Object.entries(options).length === 0}
                <div class="px-4 py-2 text-gray-500 italic">
                    Aucune option disponible
                </div>
            {/if}
        </div>
    {/if}
</div>
