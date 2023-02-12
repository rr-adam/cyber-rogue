<script>
	import { tileSize } from '$lib/store/rendering';
	export let effect;
</script>

<div
	class="effect effect-{effect.type}"
	style:top={`${effect.y * $tileSize + Math.random() * 40 }px`}
	style:left={`${effect.x * $tileSize + Math.random() * 40}px`}
>{ effect.data }</div>

<style lang="scss">
	.effect {
		position: absolute;

    font-size: 24px;

		z-index: var(--gameplay-ui-z-index);

		image-rendering: pixelated;
		background-size: 100%;

    animation-name: effect;
    animation-duration: 3s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;

		&.effect-DMG {
			color: red;
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

	@keyframes effect {
    0% { opacity: 1;  }
		100% { opacity: 0; }
  }
</style>
