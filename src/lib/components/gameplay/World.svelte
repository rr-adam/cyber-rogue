<script>
	import EntityLayer from './EntityLayer.svelte';
	import EffectsLayer from './EffectsLayer.svelte';
	import Player from './Player.svelte';
	import PlayerController from './PlayerController.svelte';
	import Map from './Map.svelte';

	import { tileSize, renderDistance } from '$lib/store/rendering';
	import { game } from '$lib/store/game';

	let viewportWidth;
	let viewportHeight;

	$: visibleTerrain = $game.map.getTerrainRectangle(
		$game.player.x,
		$game.player.y,
		$renderDistance,
		$renderDistance
	);

	$: worldX = -$game.player.x * $tileSize + viewportWidth / 2;
	$: worldY = -$game.player.y * $tileSize + viewportHeight / 2;
</script>

<PlayerController />

<div class="viewport" bind:clientWidth={viewportWidth} bind:clientHeight={viewportHeight}>
	<div class="world" style:top={`${worldY}px`} style:left={`${worldX}px`}>
		<Player />
		<EntityLayer />
		<EffectsLayer />
		<Map {visibleTerrain} />
	</div>
</div>

<style>
	.viewport {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
	.world {
		position: absolute;
		transition: top ease 0.3s, left ease 0.3s;
	}
</style>
