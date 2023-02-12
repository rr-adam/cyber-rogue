<script>
	import { tileSize, renderDistance } from '$lib/store/rendering';
	import { game } from '$lib/store/game';
  import { scanner } from '$lib/store/scanner';

	export let entity;

	$: player = $game.player;
	$: opacity =
		Math.sqrt( 
			(player.x - entity.x)*(player.x - entity.x) + (player.y - entity.y)*(player.y - entity.y) 
		) / $renderDistance * 2;

	function clickHandler() {
		scanner.set(entity);
	}
</script>

<div
	class="entity entity-{entity.name} {$scanner == entity ? 'target' : null}"
	style:top={`${entity.y * $tileSize}px`}
	style:left={`${entity.x * $tileSize}px`}
	style:width={`${$tileSize}px`}
	style:height={`${$tileSize}px`}
	style:opacity={2 - opacity}
	on:click={clickHandler}
/>

<style lang="scss">
	.entity {
		position: absolute;
		transition: top ease 0.15s, left ease 0.15s, background-color 0.2s;

		z-index: var(--gameplay-entities-z-index);

		image-rendering: pixelated;
		background-size: 100%;
		outline: 1px solid rgba(255, 0, 0, 0);

		&:hover {
			cursor: pointer;
			outline: 1px solid rgba(255, 0, 0, 0.5);
		}

		&.target {
			animation-name: targeted;
			animation-duration: 4s;
			animation-timing-function: ease; 
			animation-iteration-count: infinite;
			background-color: rgba(255, 0, 0, 0.2);
		}

		&.entity-punk1 {
			background-image: url('$lib/assets/chars/punk1.gif');
		}

		&.entity-punk2 {
			background-image: url('$lib/assets/chars/punk2.gif');
		}

		&.entity-heavy1 {
			background-image: url('$lib/assets/chars/heavy1.gif');
		}

		&.entity-terminal1 {
			background-image: url('$lib/assets/objects/terminal1.png');
		}
	}

	@keyframes targeted {
    0% { background-color: rgba(255, 0, 0, 0.05); }
		50% { background-color: rgba(255, 0, 0, 0.2); }
    100% { background-color: rgba(255, 0, 0, 0.05); }
  }
</style>
