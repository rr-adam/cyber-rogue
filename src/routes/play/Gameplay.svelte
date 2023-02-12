<script>
	import World from '$lib/components/gameplay/World.svelte';
  import { game } from '$lib/store/game';

  let appear = 0;
	setTimeout(() => {
		appear = 1;
	}, 100);
</script>

<div class="gameplay" style:opacity={appear}>
  <World />
  <div class="status-bar">Stage { $game.stage }</div>
</div>

<style lang="scss">
  .gameplay {
    width: 100%;
    height: 100%;
    position: relative;
    flex: 1;
    opacity: 0;
    transition: opacity 0.5s;

    .status-bar {
      position: absolute;
      left: 5px;
      bottom: 5px;
      font-size: 14px;
      color: white;

      user-select: none;
    }
  }
</style>
