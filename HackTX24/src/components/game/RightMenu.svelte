<script lang="ts">
    import {getIconFor} from "../../lib/icons.js";
    import PlayerDisplay from "./PlayerDisplay.svelte";
    import {gameState} from "../../lib/state.svelte.js";
    import {sendData} from "../../lib/socket.svelte";

    const players = gameState.base!.players;
    
    async function startVote() {
        await sendData({'type': 'vote_session_req'});
    }
</script>

<div class="vert_holder">
    <div class="card">
        <div class="players">
            {#each players as player}
                <PlayerDisplay name={player}/>
            {/each}
        </div>
    </div>
    <button onclick={startVote} class="vote-button"> Vote</button>
    <p class="timer"></p>
</div>
