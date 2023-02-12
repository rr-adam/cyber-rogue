import { writable } from 'svelte/store';
import { scanner } from './scanner';
import Game from '$lib/class/Game';

function createGame() {
  const newGame = new Game(Math.random().toString());
  const { subscribe, update } = writable(newGame);

  return {
    subscribe,
    playerAction: (type, data) => update((game) => {
      game.step(type, data);
      scanner.update(n => n);
      return game;
    }),
  };
}

export const game = createGame();