<script>
  import { windows } from '$lib/store/windows';
	
	export let windowData;

	let left = 15;
	let top = 15;
	let closing = false;

	function draggable(node) {
		let moving = false;
		node.style.cursor = 'move';
		node.style.userSelect = 'none';

		const mouseDownHandler = () => {
			moving = true;
		}

		const mouseMoveHandler = (e) => {
			if (moving) {
				left += e.movementX;
				top += e.movementY;

				if (left < 0)
					left = 0;
				if (top < 0)
					top = 0;
				if (left > window.innerWidth - 120)
					left = window.innerWidth - 120;
				if (top > window.innerHeight - 120)
					top = window.innerHeight - 120;
			}
		}

		const mouseUpHandler = () => {
			moving = false;
		}

		node.addEventListener('mousedown', mouseDownHandler);

		window.addEventListener('mousemove', mouseMoveHandler);

		window.addEventListener('mouseup', mouseUpHandler);

		return {
			destroy() {
				node.removeEventListener('click', mouseDownHandler);
				window.removeEventListener('click', mouseMoveHandler);
				window.removeEventListener('click', mouseUpHandler);
			}
		};
	}

	function closeWindow() {
		closing = true;
		setTimeout(() => {
			windows.closeWindow(windowData);
		}, 700);
	}
</script>

<div class="window {closing ? 'window-closing' : ''}" style:top = {`${top}px`} style:left = {`${left}px`} >
	<div class="window-bar">
		<div class="left" use:draggable>
			<div class="icon"></div>
			<span class="title">{windowData.title}</span>
		</div>
		<div class="right">
			<button class="close" on:click={closeWindow}>X</button>
		</div>		
	</div>

	<div class="content">
		<svelte:component this={windowData.component} />
	</div>
	
</div>

<style lang="scss">
  .window {
    box-shadow: rgb(255, 255, 255) 0 0 2px, red 0 0 4px, rgba(255, 0, 0, 0.452) 0 0 8px,
			rgba(146, 0, 0, 0.808) 0 0 12px, inset rgba(95, 0, 0, 0.808) 0px 0 6px -2px,
			inset red 0px 0 6px -2px;
		position: absolute;
		max-height: 400px;
		max-width: 300px;
		border-radius: 4px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		z-index: var(--gameplay-windows-z-index);

		background-color: rgb(0, 0, 0);

		transition: max-height ease-out 0.4s, max-width 0.2s 0.5s, box-shadow ease-in 0.5s 0.2s;

		.window-bar {
			height: 34px;
			color: red;
			padding: 5px;
			display: flex;
			justify-content: space-between;

			border-bottom: 1px solid red;

			.left {
				display: flex;
				align-items: center;
				flex: 1;

				.icon {
					height: 24px;
					width: 24px;
					margin-right: 5px;
					display: inline-block;

					background-size: 100%;
					background-repeat: no-repeat;
					background-image: url('$lib/assets/icons/item.png');
				}

				.title {
					font-size: 16px;
					height: 16px;
					display: inline-block;
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}

			.right {
				display: flex;
				align-items: center;
				.close {
					color: red;
					font-size: 14px;
					font-weight: normal;
					height: 14px;
					margin: 0 6px;
					padding: 0;
					display: inline-block;

					outline: none;
					background: transparent;
					border: none;

					cursor: pointer;
				}
			}
		}

		.content {
			font-size: 14px;
			color: white;
			overflow-y: auto;
			padding: 15px;
		}
  }

	.window-closing {
		max-height: 34px;
		max-width: 0px;
		box-shadow: rgb(48, 0, 0) 0 0 2px;
		
		.content {
			overflow-y: hidden;
		}
	}
</style>
