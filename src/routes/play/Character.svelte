<script>
  import Card from '$lib/components/ui/Card.svelte';
  import Tabs from '$lib/components/ui/Tabs.svelte';
  import Stats from '$lib/components/character/Stats.svelte';
  import Inventory from '$lib/components/character/Inventory.svelte';

	let tabs = [
		{ label: 'Stats', value: 1, component: Stats },
		{ label: 'Inventory', value: 2, component: Inventory },
	];
</script>

<div class="character">
  <Card>
    <div slot="icon" class="icon"></div>
    <div slot="title">Character</div>
    <Tabs slot="content" items={tabs} />
  </Card>
</div>

<style lang="scss">
  .character {
    color: red;
    height: 50%;
  }

  .icon {
    height: 35px;
		width: 35px;
		margin-right: 10px;

		background-size: 100%;
		background-repeat: no-repeat;
    background-image: url('$lib/assets/icons/character.png');
  }
</style>