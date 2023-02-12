<script>
	import { tileSize } from '$lib/store/rendering';
	import { game } from '$lib/store/game';

	$: playerTop = $game.player.y * $tileSize;
	$: playerLeft = $game.player.x * $tileSize;
</script>

<div
	class="player"
	style:top={`${playerTop}px`}
	style:left={`${playerLeft}px`}
	style:width={`${$tileSize}px`}
	style:height={`${$tileSize}px`}
/>

<style>
	.player {
    position: absolute;
		transition: top ease 0.15s, left ease 0.15s;

    z-index: var(--gameplay-entities-z-index);
    
    image-rendering: pixelated;
		background-size: 100%;
		background-image: url('$lib/assets/chars/punk1.gif');
	}
</style>
