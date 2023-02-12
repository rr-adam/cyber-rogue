<script>
	import Effect from './Effect.svelte';

	import { renderDistance } from '$lib/store/rendering';
	import { game } from '$lib/store/game';

	function effectVisible(effect) {
		let xDistance = Math.abs($game.player.x - effect.x);
		let yDistance = Math.abs($game.player.y - effect.y);
		return ( xDistance < $renderDistance && yDistance < $renderDistance );
	}
</script>

{#each $game.effectManager.effectQueue as effect (effect.id)}
  {#if effectVisible(effect)}
    <Effect {effect} />
  {/if}
{/each}

