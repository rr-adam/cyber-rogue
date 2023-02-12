<script>
	import Slot from './Slot.svelte';
  import { game } from '$lib/store/game';

  $: inventory = $game.player.inventory.slots;
</script>

<div class="inventory-container">
  <div class="equipment">

  </div>
  <div class="inventory">
    {#each inventory as slot}
      <Slot {slot} />
    {/each}
  </div>
</div>

<div class="character-red">

</div>

<style>
  .inventory-container {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .equipment {
    width: 96px;
    height: 128px;
    background-image: url('$lib/assets/ui/character-netrunner.png');
    background-size: 100%;
    opacity: 0.5;
  }

  .inventory {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    align-content: flex-start;
  }
</style>

