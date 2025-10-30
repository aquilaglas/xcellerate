<script lang="ts">
    import {Search} from "lucide-svelte";

    type Props = {
        search?: string;
        searchField: string;
    }

    const {search, searchField}: Props = $props();
</script>

<form>
	<div class="btn-secondary gap-0 font-light p-0 group hover:bg-gray-300 dark:hover:bg-gray-800">
	    <input class="w-full input border-2 shadow-none dark:border-gray-800" type="search" id="search-bar-input"
					 placeholder="Rechercher un client par {searchField}" />
		<button type="submit">
			<Search class="text-gray-900 dark:text-green-50 bg-gray-300 dark:bg-gray-800
			transition-colors duration-300 ease-in-out m-2" />
		</button>
	</div>
</form>