<script lang="ts">
    import Header from "$lib/components/ui/Header.svelte";
    import {goto} from "$app/navigation";

    let email = '';
    let password = '';
    let confirmPassword = '';
    let errorMessage = '';
    let successMessage = '';
    let isSubmitting = false;

    async function handleRegister(event: Event) {
        event.preventDefault();
        errorMessage = '';
        successMessage = '';

        if (password !== confirmPassword) {
            errorMessage = 'Les mots de passe ne correspondent pas.';
            return;
        }

        if (password.length < 6) {
            errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.';
            return;
        }

        isSubmitting = true;

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });

            const data = await res.json();

            if (!res.ok) {
                errorMessage = data.error || 'Erreur lors de l’inscription.';
                errorMessage = 'Erreur lors de l’inscription.';
            } else {
                successMessage = data.message || 'Inscription réussie !';
                await goto('/login');
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
        <form onsubmit={handleRegister} class="card gap-4 -translate-y-[200px] min-w-1/4">
            <h2 class="text-2xl font-bold">Créer un compte</h2>

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

            <div>
                <label for="confirmPassword" class="block mb-1">Confirmer le mot de passe</label>
                <input
                        id="confirmPassword"
                        type="password"
                        bind:value={confirmPassword}
                        required
                        class="input w-full"
                />
            </div>

            <div class="w-full flex justify-end">
                <a class="border-b text-xs hover:" href="/login">Se connecter</a>
            </div>

            <button
                    type="submit" class="btn-primary disabled:opacity-50"
                    disabled={isSubmitting}
            >
                {isSubmitting ? 'Inscription...' : 'S’inscrire'}
            </button>
        </form>
    </div>
</Header>
