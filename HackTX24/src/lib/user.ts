import { writable } from "svelte/store";

let name = writable<string>("");
export { name };
