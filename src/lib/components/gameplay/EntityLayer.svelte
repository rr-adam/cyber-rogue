<script>
	import Entity from './Entity.svelte';

	import { renderDistance } from '$lib/store/rendering';
	import { game } from '$lib/store/game';

	function entityVisible(entity) {
		let xDistance = Math.abs($game.player.x - entity.x);
		let yDistance = Math.abs($game.player.y - entity.y);
		return ( xDistance < $renderDistance && yDistance < $renderDistance );
	}
</script>

{#each $game.map.entities as entity (entity.id)}
  {#if entityVisible(entity)}
    <Entity {entity} />
  {/if}
{/each}

