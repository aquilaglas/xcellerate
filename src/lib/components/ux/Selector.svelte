<script lang="ts">
    type Props = {
        options: string[];
        value: string;
        isOpen?: boolean,
        children?: any
    };

    let {options, value = $bindable(), isOpen = $bindable(false), children}: Props = $props();

    const filteredOptions = options.filter((o) => o !== value);

    export function toggleDropdown() {
        isOpen = !isOpen;
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
    {@render children?.()}

    {#if isOpen}
        <div
                class="absolute z-100 w-fit mt-1 bg-white dark:bg-gray-900 border border-gray-300
                dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
            {#if options.length === 0}
                <div class="px-4 py-2 text-gray-500 italic">
                    Aucune option disponible
                </div>

            {:else if filteredOptions.length === 0}
                <div class="px-4 py-2 text-gray-500 italic">
                    Pas d'autres options disponibles
                </div>

            {:else}
                {#each filteredOptions as option}
                    <button
                            type="button"
                            onclick={() => selectOption(option)}
                            class="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800
                            active:bg-gray-200 dark:active:bg-gray-800 transition-colors"
                    >
                        {option}
                    </button>
                {/each}
            {/if}
        </div>
    {/if}
</div>
