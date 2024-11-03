<script lang="ts">
    let players: string[] = ["hi", "hello", "hey"];
    let player = "current player";
    const startVote = () => {
        console.log("Starting vote");
    }
</script>

<style>
  .card {
    font-family: "hun", serif;
    border-radius: 0.5em;
    position: absolute;
    margin: 1em;
    width: 15%;
    height: 50%;
    right: 3%;
    top: 5%;
    padding: 1em;
    background-color: rgba(204, 192, 255, 0.8);
    justify-content: center;
  }
  .players {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .player {
    text-align: center;
    font-family: "hun", serif;
    border-radius: 0.5em;
    width: 100%;
    height: 100%;
    padding: 12px 0 12px 0;
    margin: 0.2em;
    background-color: rgba(204, 192, 255, 0.8);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    color: #000000;
  }
  .vote-button {
    font-family: "hun", serif;
    border-radius: 0.5em;
    width: 100%;
    height: 100%;
    padding: 12px 0 12px 0;
    margin: 0.2em;
    background-color: rgba(204, 192, 255, 0.8);
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #000000;
  }
</style>

<div style="">
    <div class="card">
        <div class="players">
            {#each players as player}
                <div class="player">
                    {player}
                </div>
            {/each}
        </div>
    </div>
    <button onclick={startVote} class="vote-button">
        Add Player
    </button>
</div>