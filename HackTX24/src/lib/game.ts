import { writable } from "svelte/store";

type GameStateType = {
  gameTopic: string;
  gameWord?: string;
  players: string[];
  imposters?: string[];
};

let game = writable<GameStateType>();
let threads = writable(); //TODO get Kason to get the types
export { game, threads };
