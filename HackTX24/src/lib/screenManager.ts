import type { Component } from "svelte";
import { writable } from "svelte/store";

let currentPage = writable<Component>(undefined);
export { currentPage };
