<script lang="ts">
    type Props = {
        value: string | null,
        title: string
    };

    let { value = $bindable(), title }: Props  = $props();
</script>

<label class="card">
    <span>{title}</span>
    <input bind:value class="input" placeholder="Ajouter: {title}"/>
</label>
