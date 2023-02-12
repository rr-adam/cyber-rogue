<script>
  import Card from '$lib/components/ui/Card.svelte';
  import Tabs from '$lib/components/ui/Tabs.svelte';

  import Exploit from '$lib/components/cyberdeck/Exploit.svelte';
  import Scanner from '$lib/components/cyberdeck/Scanner.svelte';

	let tabs = [
		{ label: 'Scanner', value: 1, component: Scanner },
		{ label: 'Exploit', value: 2, component: Exploit },
		{ label: 'Firewall', value: 3, component: Exploit },
	];
</script>

<div class="cyberdeck">
  <Card>
    <div slot="icon" class="icon"></div>
    <div slot="title">Cyberdeck</div>
    <Tabs slot="content" items={tabs} />
  </Card>
</div>

<style lang="scss">
  .cyberdeck {
    height: 50%;
    color: red;
  }

  .icon {
    height: 35px;
		width: 35px;
		margin-right: 10px;

		background-size: 100%;
		background-repeat: no-repeat;
    background-image: url('$lib/assets/icons/cyberdeck.png');
  }
</style>