<div class="card">
	<div class="title-bar-container">
		<div class="divider" />
		<div class="title-bar">
			<slot name="icon" />
			<slot name="title" />
		</div>
		<div class="divider" />
	</div>
	<div class="card-content">
		<slot name="content" />
	</div>
</div>

<style lang="scss">
	.card {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;

		.card-content {
			padding: 15px;
			flex: 1;
			min-height: 0;
		}

		.title-bar-container {
			.title-bar {
				width: 100%;
				padding: 15px 15px;
				display: flex;

				font-size: 32px;
				background-color: transparent;
				background-image: linear-gradient(
					to right,
					rgba(255, 0, 0, 0) 20%,
					rgba(211, 42, 42, 0.123) 65%,
					rgba(255, 0, 0, 0) 95%
				);
			}

			.divider {
				width: 100%;
				height: 1px;
				background-image: radial-gradient(rgba(255, 0, 0, 0.363) 25%, rgba(255, 0, 0, 0) 70%);
			}
		}
	}
</style>
