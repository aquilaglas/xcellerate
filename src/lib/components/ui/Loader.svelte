<script lang="ts">
    let {active, respectHeader = false}: { active: boolean, respectHeader?: boolean } = $props();
</script>

{#if active}
    <div class="loader-overlay" class:respect-header={respectHeader}>
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

    .loader-overlay.respect-header {
        top: calc(env(safe-area-inset-top) + var(--header-h, 0px));
    }

    .spinner {
        width: 160px;
        height: 160px;
        border: 16px solid transparent;
        border-top-color: #15803d;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
