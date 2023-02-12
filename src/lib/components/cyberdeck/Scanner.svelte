<script>
	import { scanner } from '$lib/store/scanner';
	let scanReady = true;
	let scannedId = null;

	function checkIfScannerUpdated(scanner) {
		if (scannedId != scanner?.id) {
			scanReady = false;
			scannedId = scanner.id;
			setTimeout(onScannerReady, 1300);
		}
	}

	$: checkIfScannerUpdated($scanner);

	function onScannerReady() {
		scanReady = true;
	}
</script>

{#if scanReady}
	{#if $scanner}
		{#if $scanner.stats.hp > 0}
			<div class="entity-scanned">
				<h3>Scanned: {$scanner.displayName}</h3>
				<p>Health: {$scanner.stats.hp}/{$scanner.stats.maxHp}</p>
				<p>Armor: {$scanner.stats.armor}</p>
				<p>Evasion: {$scanner.stats.evasion}</p>
				<p>Damage: {$scanner.stats.baseDmg}</p>
				<p>critChance: {$scanner.stats.critChance}</p>
				<p>critDmg: {$scanner.stats.critDmg}</p>
				<p>accuracy: {$scanner.stats.accuracy}</p>
				<p>fireRate: {$scanner.stats.fireRate}</p>
				<p>poisonDmg: {$scanner.stats.poisonDmg}</p>
				<p>electricityDmg: {$scanner.stats.electricityDmg}</p>
				<p>magneticDmg: {$scanner.stats.magneticDmg}</p>
				<p>coldDmg: {$scanner.stats.coldDmg}</p>
				<p>fireDmg: {$scanner.stats.fireDmg}</p>
				<p>strength: {$scanner.stats.strength}</p>
				<p>agility: {$scanner.stats.agility}</p>
				<p>intelligence: {$scanner.stats.intelligence}</p>
				<p>fame: {$scanner.stats.fame}</p>
			</div>
		{:else}
			<div>
				<h3>Scanned: {$scanner.displayName}</h3>
				<p>Entity is dead.</p>
			</div>
		{/if}
	{:else}
		Scan some entity...
	{/if}
{:else}
	<div class="scan-loading">
		<div class="content">
			<span>Scanning...</span>
			<div class="loading-bar">
				<div class="loading-bar-fill" />
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.scan-loading {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.content {
			display: flex;
			flex-direction: column;
			width: 100%;

			align-items: center;

			animation-name: loadingOpacity;
			animation-duration: 0.3s;
			animation-delay: 1s;
			animation-timing-function: ease;
			animation-fill-mode: forwards;

			span {
				font-size: 16px;
			}

			.loading-bar {
				width: 70%;
				height: 24px;
				margin-top: 10px;
				padding: 2px;
				border: 1px solid rgb(117, 0, 0);
				position: relative;

				.loading-bar-fill {
					height: 100%;
					width: 0%;

					animation-name: loadingAnimation;
					animation-duration: 0.6s;
					animation-delay: 0.2s;
					animation-timing-function: linear;
					animation-fill-mode: forwards;

					background: red;
				}
			}
		}
	}

	@keyframes loadingAnimation {
		0% {
			width: 0%;
		}
		15% {
			width: 9%;
		}
		65% {
			width: 30%;
		}
		85% {
			width: 90%;
		}
		100% {
			width: 100%;
		}
	}
	@keyframes loadingOpacity {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
</style>
