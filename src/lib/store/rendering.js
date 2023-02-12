import { writable } from 'svelte/store';

export const tileSize = writable(72);
export const renderDistance = writable(10);