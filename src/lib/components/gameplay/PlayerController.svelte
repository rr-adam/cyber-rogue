<script>
	import { game } from '$lib/store/game';
  import { throttle } from '$lib/util/utils'

  let direction = 'right';
  let keys = [0,0,0,0];

  function isMoving() {
    return (keys[0] || keys[1] || keys[2] || keys[3]);
  };

  function startDirection(key, dir) {
    direction = dir;
    if (!isMoving())
      movePlayerLoop();
    keys[key] = 1;
  }

  function onKeyDown(e) {
		switch (e.keyCode) {
			case 38:
      case 87:
        startDirection(0, 'up');
				break;
			case 40:
      case 83:
        startDirection(2, 'down');
				break;
			case 37:
      case 65:
        startDirection(3, 'left');
				break;
			case 39:
      case 68:
        startDirection(1, 'right');
				break;
		}
	}

  function onKeyUp(e) {
		switch (e.keyCode) {
			case 38:
      case 87:
        keys[0] = 0;
        updateDirection();
				break;
			case 40:
      case 83:
        keys[2] = 0;
        updateDirection();
				break;
			case 37:
      case 65:
        keys[3] = 0;
        updateDirection();
				break;
			case 39:
      case 68:
        keys[1] = 0;
        updateDirection();
				break;
		}
	}

  function updateDirection() {
    if (keys[0] == 1)
      direction = 'up';
    if (keys[1] == 1)
      direction = 'right';
    if (keys[2] == 1)
      direction = 'down';
    if (keys[3] == 1)
      direction = 'left';
  }

  const movePlayerLoop = throttle( 
    () => {
      game.playerAction('move', direction);
      setTimeout(() => {
        if (isMoving())
          movePlayerLoop();
      }, 150);
    }, 130);

</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />