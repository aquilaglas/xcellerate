<script lang="ts">
    type Props = {
        options: { label: string; value: string }[];
        value?: string;
        isOpen?: boolean;
        children?: any;
        onSelect?: (value: string) => void;
        buttonClass?: string;
        colors?: Record<string, string | null> | null;
        title?: string;
        disabled?: boolean;
        emptyLabel?: string;
    };

    let {
        options,
        value = $bindable(''),
        isOpen = $bindable(false),
        children, onSelect,
        buttonClass = '',
        colors = null,
        title = '',
        disabled = false,
        emptyLabel = 'tous'
    }: Props = $props();


    const filteredOptions = options.filter((o) => o.value !== value);
    const selectedLabel = $derived(options.find(o => o.value === value)?.label || null);

    const displayColor = $derived(
        colors ?
            (
                value === '' || value === emptyLabel ?
                '--color-gray-400'
                : (colors[value] ?? '--color-black')
            )
            : null
    );


    export function toggleDropdown() {
        isOpen = !isOpen;
    }

    function selectOption(optionValue: string) {
        value = optionValue;
        isOpen = false;
        if (onSelect) {
            onSelect(optionValue);
        }
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
    {#if children}
        {@render children()}
    {:else}
        <button
                type="button"
                onclick={toggleDropdown}
                class="flex items-center justify-between gap-2 {buttonClass}"
                style="background-color:var({displayColor});"
        >
            <span>{selectedLabel ?? emptyLabel}</span>
            {#if !disabled}
                <svg
                        class="w-4 h-4 transition-transform {isOpen ? 'rotate-180' : ''}"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
            {/if}
        </button>
    {/if}

    {#if isOpen && !disabled}
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
                            onclick={() => selectOption(option.value)}
                            class="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800
                            active:bg-gray-200 dark:active:bg-gray-800 transition-colors"
                            title={title}
                    >
                        {option.label}
                    </button>
                {/each}
            {/if}
        </div>
    {/if}
</div>
