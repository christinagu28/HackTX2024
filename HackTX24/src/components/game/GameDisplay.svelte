<script lang="ts">

    import ChatBox from "./ChatBox.svelte";
    import {gameState} from "../../lib/state.svelte";
</script>

<div class="container">
    <div class="thread-div">
        {#if gameState.threads.length === 0}
            No conversations yet! Press "ask" to ask someone something!
        {:else}
            {#each gameState.threads as thread (thread.id)}
                <ChatBox thread={thread}/>
            {/each}
        {/if}
    </div>
</div>

<style>
    .thread-div {
        background: transparent;
        overflow-x: auto;
        left: 0;
        right: 0;
    }

    .container {
        height: 100%;
        width: 100%;
    }


</style>