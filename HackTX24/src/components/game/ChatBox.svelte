<script lang="ts">
    import {gameState} from "../../lib/state.svelte";
    import ChatMsg from "./ChatMsg.svelte";

    type Props = {
        thread: {
            id: number,
            asker: string,
            question: string,
            receiver: string,
            msgs: {
                username: string,
                text: string
            }[]
        }
    }
    let {thread}: Props = $props();
    let name = $state('');

    // only msgs can change
    let msgs = $derived(gameState.threads[thread.id].msgs)
</script>

<div>
    <h1>
        {thread.question}
    </h1>
    <p>Asked by {thread.asker} to {thread.receiver}</p>
    {#each msgs as msg}
        <ChatMsg data={msg}/>
    {/each}
    <input bind:value={name}>
</div>

<style>
    div {
        background: rgba(37, 10, 44, 0.94);
        padding: 4em;
        border-radius: 30px;
    }
</style>