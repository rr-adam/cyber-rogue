<script>
  import { windows } from '$lib/store/windows';
	import Window from './Window.svelte';
</script>

<div class="windows">
  {#each $windows as windowData}
    <Window {windowData} />
  {/each}
</div>


<style>
  .windows {
    z-index: var(--gameplay-windows-z-index);
  }
</style>