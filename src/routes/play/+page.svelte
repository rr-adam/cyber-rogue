<script>
	import WindowsManager from '$lib/components/ui/WindowsManager.svelte';
	import Character from './Character.svelte';
	import Cyberdeck from './Cyberdeck.svelte';
	import Gameplay from './Gameplay.svelte';

  import { windows } from '$lib/store/windows';
	import WelcomeWindow from '$lib/components/ui/windows/WelcomeWindow.svelte';

	windows.openWindow({
		title: 'Welcome',
		component: WelcomeWindow
	});
</script>

<div class="game">
	<WindowsManager />
	<Gameplay />
	<div class="sidebar">
		<Cyberdeck />
		<Character />
	</div>
</div>

<style lang="scss">
	.game {
		display: flex;
		background-color: rgb(0, 0, 0);
		background-image: linear-gradient(
			74deg,
			rgba(61, 0, 0, 0.45) -15%,
			rgba(49, 0, 0, 0.15) 20% 70%,
			rgba(53, 0, 0, 0.55) 110%
		);
		height: 100vh;
		width: 100vw;
		position: relative;
		overflow: hidden;

		.sidebar {
			z-index: var(--gameplay-ui-z-index);
			width: 500px;
			height: 100%;

			background-color: black;
			box-shadow: rgb(255, 255, 255) 0 0 2px, red 0 0 4px, rgba(255, 0, 0, 0.452) 0 0 8px,
				rgba(146, 0, 0, 0.808) 0 0 12px, inset rgba(95, 0, 0, 0.808) 2px 0 6px -4px,
				inset red 2px 0 6px -4px;
		}
	}
</style>
