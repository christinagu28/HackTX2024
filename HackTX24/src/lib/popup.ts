import type { Component } from "svelte";
import { writable } from "svelte/store";

export type PopupEvent = {
  component: Component;
  blocking: boolean;
  timed: boolean;
};

export const popupQueue = writable<PopupEvent[]>([]);

export function showPopup(component: Component, blocking = true, timed = true) {
  popupQueue.update((cur) => {
    cur.push({ component, blocking, timed });
    return cur;
  });
}

export function removePopup() {
  popupQueue.update((cur) => {
    cur.shift();
    return cur;
  });
}
