<script>
	import Tile from './Tile.svelte';

	export let visibleTerrain;
</script>

<div class="map">
  {#each visibleTerrain as row (row.id)}
      {#each row as tile (tile.id)}
        {#if tile.type != 0}
          <Tile {tile} />
        {/if}
      {/each}
  {/each}
</div>

<style lang="scss">
	.map {
    position: relative;
	}
</style>
