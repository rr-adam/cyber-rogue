<script>
	import { tileSize, renderDistance } from '$lib/store/rendering';
	import { game } from '$lib/store/game';

	export let tile;

	$: player = $game.player;
	$: opacity =
		(Math.sqrt(
			(player.x - tile.x) * (player.x - tile.x) + (player.y - tile.y) * (player.y - tile.y)
		) /
			$renderDistance) *
		4;
	// $: opacity =
	// 	(
	// 		Math.abs(player.x - tile.x) + Math.abs(player.y - tile.y)
	// 	) / $renderDistance * 2;
</script>

<div
	class="tile type-{tile.type}"
	style:width={`${Math.floor($tileSize)}px`}
	style:height={`${Math.floor($tileSize)}px`}
	style:left={`${Math.floor(tile.x * $tileSize)}px`}
	style:top={`${Math.floor(tile.y * $tileSize)}px`}
	style:opacity={4 - opacity}
/>

<style lang="scss">
	.tile {
		image-rendering: pixelated;
		background-size: 100%;
		position: absolute;
		color: white;

		z-index: var(--gameplay-tiles-z-index);

		&.type-0 {
			background: none;
		}

		&.type-1 {
			background-image: url('$lib/assets/tiles/wall1.png');
			box-shadow: 0 8px 16px black;
			z-index: var(--gameplay-walls-z-index);
		}

		&.type-2 {
			background-image: url('$lib/assets/tiles/floor1.png');
		}

		&.type-3 {
			background-image: url('$lib/assets/tiles/elevator.png');
		}
	}
</style>
