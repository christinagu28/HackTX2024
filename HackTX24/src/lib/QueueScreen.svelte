<script lang="ts">
  import { socket, commands } from "./socket";
  import { name } from "./user";
  import { icon_url } from "./icons";
  import MainScreen from "./MainScreen.svelte";
  import { currentPage } from "./screenManager";

  let ready: boolean = $state(false);
  let elapsed: number = $state(0);
  let loaded: boolean = $state(false);
  let lobby: Record<string, boolean> = $state({});

  commands.set("game_start", () => {
    // currentPage.set()
    console.log("Starting game!");
    currentPage.set(MainScreen);
  });

  commands.set("game_state", () => {
    //to be used in the future for spectating
  });

  commands.set("lobby_data", (lobby_data) => {
    lobby = lobby_data.readiness;
    ready = lobby[$name];
    console.log(lobby);
  });

  const blocking_message = $derived(
    Object.keys(lobby).length === 0
      ? "Waiting for the current game to finish"
      : Object.keys(lobby).length < 3
        ? "Waiting for more players to join the game"
        : "Waiting for everyone to be ready"
  );

  $effect(() => {
    if (loaded) {
      return;
    }

    const id = setInterval(() => {
      elapsed = (elapsed + 1) % 4;
    }, 800);

    return () => {
      clearInterval(id);
    };
  });

  function readyUp() {
    ready = !ready;
    socket.send(
      JSON.stringify({ type: "lobby_readiness_data", newReadiness: ready })
    );
  }
</script>

<div class="center-gradient">
  <div class="center">
    <div class="vert">
      <label for="loading-image"
        >{blocking_message}{".".repeat(elapsed)}{@html "&nbsp".repeat(
          3 - elapsed
        )}</label
      >
      <img
        id="loading-image"
        src="WalkingCat.gif"
        alt=""
        width="100px"
        height="100px"
      />

      {#if Object.keys(lobby).length >= 3}
        <button onclick={readyUp}
          >{#if ready}UN{/if}READY</button
        >
      {/if}

      {#each Object.keys(lobby) as name}
        <div>
          <img src={icon_url(name)} alt="" height="22px" />
          <b>{name}</b> - {#if lobby[name]}
            <span style="color: green">ready</span>
          {:else}
            <span style="color: red">waiting</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .center {
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    background-color: #ccc0ff;
    border-radius: 15px;
    box-shadow: black;
  }
  .vert {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  label {
    font-size: 16px;
    font-weight: bold;
  }
</style>
