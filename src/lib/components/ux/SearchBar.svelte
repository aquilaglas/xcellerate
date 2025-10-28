<script>
    import {Search} from "lucide-svelte";
</script>

<form>
	<div class="group sm:w-full bg-black hover:bg-gray-700 active:bg-gray-700 rounded-4xl border border-gray-500 sm:px-4 flex gap-2">
		<input class="hidden sm:block w-full text-white placeholder:text-white bg-black group-hover:bg-gray-700 group-active:bg-gray-700 border-none focus:outline-none focus:ring-0" type="search" id="search-bar-input"
					 placeholder="Rechercher" />
		<button type="submit">
			<Search
				class="text-white bg-black group-hover:bg-gray-700 group-active:bg-gray-700 m-2" />
		</button>
	</div>
</form>