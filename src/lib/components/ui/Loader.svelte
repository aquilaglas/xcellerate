<script lang="ts">
    let {active}: { active: boolean } = $props();
</script>

{#if active}
    <div class="loader-overlay">
        <div class="spinner"></div>
    </div>
{/if}

<style>
    .loader-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(1px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        cursor: progress;
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid transparent;
        border-top-color: #3b82f6;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
