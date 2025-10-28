<script>
    import {Search} from "lucide-svelte";
</script>

<form>
	<div class="group w-full bg-black hover:bg-gray-700 rounded-4xl border border-gray-500 px-4 flex gap-2">
		<input class="w-full text-white placeholder:text-white bg-black group-hover:bg-gray-700 border-none focus:outline-none focus:ring-0" type="search" id="search-bar-input"
					 placeholder="Rechercher" />
		<button type="submit">
			<Search
				class="text-white bg-black group-hover:bg-gray-700" />
		</button>
	</div>
</form>