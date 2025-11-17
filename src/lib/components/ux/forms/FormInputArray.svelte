<script lang="ts">
    import {Trash2} from "lucide-svelte";
    import InputAutoResize from "$lib/components/ui/InputAutoResize.svelte";

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

<label class="card">
    <span>{title + 's'}</span>
    <span class="flex flex-col gap-2">
        {#each value as _, index}
            <div class="flex gap-2">
                <InputAutoResize bind:value={value[index]} placeholder="Ajouter: {title}"/>
                <button type="button" onclick={() => removeFromArray(index)}
                        class="btn-danger w-[42px] h-[42px]">
                    <Trash2/>
                </button>
            </div>
        {/each}
        <button type="button"
                onclick={addInArray}
                class="btn-primary h-[42px]">
            {#if isFeminine }
                <span>{"Ajouter une " + title}</span>
            {:else}
                <span>{"Ajouter un " + title}</span>
            {/if}
        </button>
    </span>
</label>