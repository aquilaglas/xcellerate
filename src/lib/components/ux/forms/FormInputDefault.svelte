<script lang="ts">
    type Props = {
        value: string | null,
        title: string
    };

    let { value = $bindable(), title}: Props  = $props();
</script>

<label class="flex flex-col bg-white text-left p-4 rounded-2xl">
    <span class="text-black font-medium">{title}</span>
    <input
            bind:value
            class="p-2 rounded-lg text-black focus:ring-0 focus:outline-none border-black border-4"
            placeholder="Ajouter: {title}"
    />
</label>
