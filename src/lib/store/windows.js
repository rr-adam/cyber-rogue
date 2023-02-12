import { writable } from 'svelte/store';

function createWindows() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    openWindow: (window) => update(windows => {
      windows.push(window);
      return windows;
    }),
    closeWindow: (window) => update(windows => {
      windows.splice(windows.indexOf(window), 1);
      return windows;
    })
  };
}

export const windows = createWindows();