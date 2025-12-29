<script lang="ts">
    import Header from "$lib/components/ui/Header.svelte";
    import {goto} from "$app/navigation";

    let email = '';
    let password = '';
    let errorMessage = '';
    let successMessage = '';
    let isSubmitting = false;

    async function handleLogin(event: Event) {
        event.preventDefault();
        errorMessage = '';
        successMessage = '';

        isSubmitting = true;

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });

            const data = await res.json();

            if (!res.ok) {
                errorMessage = data.error || 'Erreur lors de la connexion.';
                errorMessage = 'Erreur lors de la connexion.';
            } else {
                successMessage = data.message || 'Connexion réussie !';
                await goto('/');
            }
        } catch (err) {
            console.error(err);
            errorMessage = 'Erreur réseau, réessayez plus tard.';
        } finally {
            isSubmitting = false;
        }
    }
</script>

<Header>
    <div class="w-full flex justify-center bg-green-700 pt-[40vh] overscroll-none">
        <form onsubmit={handleLogin} class="card gap-4 -translate-y-[200px] min-w-1/4">
            <h2 class="text-2xl font-bold">Connexion</h2>

            {#if errorMessage}
                <span class="text-red-500 text-xs">{errorMessage}</span>
            {/if}

            {#if successMessage}
                <div class="text-green-700 text-xs">{successMessage}</div>
            {/if}

            <div>
                <label for="email" class="block mb-1">Email</label>
                <input
                        id="email"
                        type="email"
                        bind:value={email}
                        required
                        class="input w-full"
                />
            </div>

            <div>
                <label for="password" class="block mb-1">Mot de passe</label>
                <input
                        id="password"
                        type="password"
                        bind:value={password}
                        required
                        class="input w-full"
                />
            </div>

            <div class="w-full flex justify-end">
                <a class="border-b text-xs hover:" href="/register">S'inscrire</a>
            </div>

            <button
                    type="submit" class="btn-primary disabled:opacity-50"
                    disabled={isSubmitting}
            >
                {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </button>
        </form>
    </div>
</Header>
