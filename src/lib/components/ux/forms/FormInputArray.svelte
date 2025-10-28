<script lang="ts">
    import {Trash2} from "lucide-svelte";

    type Props = {
        value: Array<string>,
        title: string,
        isFeminine?: boolean,
    };

    let {value = $bindable(), title, isFeminine = false}: Props = $props();

    function addInArray() {
        value.push('');
    }

    function removeFromArray(index: number) {
        value.splice(index, 1);
    }
</script>

<label class="flex flex-col bg-white text-left p-4 rounded-2xl">
    <span class="text-black font-medium">{title + 's'}</span>
    <span class="flex flex-col gap-2">
        {#each value as _, index}
            <div class="flex gap-2">
                <input bind:value={value[index]}
                       class="w-full p-2 rounded-lg text-black focus:ring-0 focus:outline-none border-black border-4"
                       placeholder="Ajouter: {title}"/>
                <button type="button" onclick={() => removeFromArray(index)}
                        class="flex items-center justify-evenly w-[48px] h-[48px] p-2 rounded-lg bg-red-500 hover:bg-red-700 active:bg-red-700">
                    <Trash2/>
                </button>
            </div>
        {/each}
        <button type="button"
                onclick={addInArray}
                class="uppercase bg-black hover:bg-gray-700 active:bg-gray-700 rounded-lg p-2 h-[48px]">
            {#if isFeminine }
                <span class="text-white font-bold">{"Ajouter une " + title}</span>
            {:else}
                <span class="text-white font-bold">{"Ajouter un " + title}</span>
            {/if}
        </button>
    </span>
</label>