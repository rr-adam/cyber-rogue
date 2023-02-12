<script>
	export let items = [];
	export let activeTabValue = 1;

	const handleClick = (tabValue) => {
		activeTabValue = tabValue;
	};
</script>

<div class="tabs-container">
	<ul>
		{#each items as item}
			<li class={activeTabValue === item.value ? 'active' : ''}>
				<button on:click={handleClick(item.value)}>{item.label}</button>
			</li>
		{/each}
	</ul>
	{#each items as item}
		<div class="box" hidden={activeTabValue !== item.value}>
			<svelte:component this={item.component} />
		</div>
	{/each}
</div>

<style lang="scss">
	.tabs-container {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.box {
		overflow: auto;
		flex: 1;
		padding: 15px;
		border-radius: 0 0 4px 4px;
		border-top: 0;
		background-color: black;
		border-width: 1px;
		border-style: solid;
		border-image: linear-gradient(to bottom, red, rgba(0, 0, 0, 0)) 1 100%;
	}
	ul {
		user-select: none;
		display: flex;
		flex-wrap: wrap;
		padding-left: 0;
		margin-bottom: 0;
		list-style: none;
		border-bottom: 1px solid red;
		margin-top: 0;
	}
	li {
		margin-bottom: -1px;
	}

	button {
		display: inline;
		font-family: inherit;
		font-size: 16px;
		color: red;
		border-width: 1px;
		border-style: solid;
		border-color: transparent;
		border-radius: 4px 4px 0 0;
		display: block;
		padding: 0.5rem 1rem;
		cursor: pointer;
		background-color: transparent;
	}

	button:hover {
		border-image: linear-gradient(to top, red, rgba(0, 0, 0, 0)) 1 100%;
		background-image: linear-gradient(to top, rgba(255, 0, 0, 0.178), rgba(255, 0, 0, 0));
		background-repeat: no-repeat;
	}

	li.active > button {
		color: rgba(255, 255, 255, 0.95);
		background-color: var(--bg-red-2);
		background-image: none;
		border-image: none;
		border-color: red;
		border-bottom: black;

		text-shadow: 0 0 4px red, 0 0 12px red;
	}
</style>
