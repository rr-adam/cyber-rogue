<script>
  	import { game } from '$lib/store/game';

    $: player = $game.player;
</script>

<h2>Stats</h2>
<p>HP: {player.stats.hp} / {player.stats.maxHp}</p>