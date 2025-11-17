<script lang="ts">
    import InputAutoResize from "$lib/components/ui/InputAutoResize.svelte";

    type Props = {
        value: string | null,
        title: string
    };

    let { value = $bindable(), title }: Props  = $props();
</script>

<label class="card">
    <span>{title}</span>
    <InputAutoResize bind:value class="input" placeholder="Ajouter: {title}"/>
</label>
