<script lang="ts">
    import {lobbyState} from "../lib/state.svelte";
    import {sendData} from "../lib/socket.svelte";
    import ReadyPlayerDisplay from "./ReadyPlayerDisplay.svelte";

    let elapsed: number = $state(0);
    let ready: boolean = $derived(lobbyState.data[lobbyState.name!])

    const moreThan3Players = $derived(Object.keys(lobbyState.data).length >= 3)
    // avoid proxy properties with $state.snapshot
    let msg = $derived(
        moreThan3Players
            ? "Waiting for more players"
            : "Waiting for everyone to be ready"
    );

    let btnText = $derived(ready ? 'unready' : 'ready');

    $effect(() => {
        const timer = setInterval(() => {
            elapsed++;
            elapsed %= 4;
        }, 800);
        return () => clearInterval(timer);
    });

    const htmlElapsedArray: string[] = [];
    for (let i = 0; i < 4; i++) {
        htmlElapsedArray[i] = "&nbsp".repeat(i);
    }

    function readyUp() {
        sendData({type: "lobby_readiness_data", newReadiness: !ready});
    }
</script>

<div class="center">
    <div class="holder">
        <p>{@html htmlElapsedArray[elapsed]}{msg}{"..".repeat(elapsed)}</p>
        <img src="WalkingCat.gif" alt="a walking cat animation"/>
        <button onclick={readyUp} disabled={!moreThan3Players}>{btnText}</button>
        {#each Object.keys(lobbyState.data) as name (name)}
            <ReadyPlayerDisplay untypedName={name}/>
        {/each}
    </div>
</div>

<style>
    .center {
        text-align: left;
        display: flex;
        flex-direction: column;
        padding: 4em;
        border-radius: 30px;
        background: rgba(16, 8, 21, 0.99);
    }
    
    .holder {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    button {
        background: rgba(119, 48, 164, 0.99);
    }
</style>
