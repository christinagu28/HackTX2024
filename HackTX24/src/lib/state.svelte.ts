import type {Component} from "svelte";
import {on} from "./socket.svelte";
import NameScreen from "../components/NameScreen.svelte";
import ReadyScreen from "../components/ReadyScreen.svelte";
import GameDisplay from "../components/game/GameDisplay.svelte";
import MainScreen from "./MainScreen.svelte";

// state, i think its self explanatory for the most part 
// this part is not the actual game-related part
export let display: { page: Component } = $state({page: GameDisplay})

export function finishNameScreen(goodNameValue: string) {
    console.log('finished name screen with value: ', goodNameValue)
    display.page = ReadyScreen;
    lobbyState.name = goodNameValue;
}

export type Settings = {
    numImposter: number,
    voteInterval: number
}

export let lobbyState: {
    data: { [name: string]: boolean },
    name?: string,
    settings?: Settings
} = $state({data: {}});

on('lobby_data', (data) => {
    // update our state
    lobbyState.data = data.readiness
});
on('new_settings', (data) => {
    lobbyState.settings = data.settings
});

export let gameState: {
    base?: {
        gameTopic: string,
        gameWord?: string,
        players: string[],
        imposters?: string[]
    }
    threads: {
        id: number,
        asker: string, 
        question: string, 
        receiver: string,
        msgs: {
            username: string, 
            text: string
        }
    }[],
    votingSession?: { [key: string]: string }
} = $state({threads: []})

on('game_state', (data) => {
    gameState.base = data
});

export function moveToGameView() {
    console.log('moving to the game view now')
    lobbyState.data = {}
    // reset our data for next time

    display.page = GameDisplay
}