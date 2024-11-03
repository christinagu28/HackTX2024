<script lang="ts">
  import QueueScreen from "./QueueScreen.svelte";
  import { name } from "./user";
  import { currentPage } from "./screenManager";
  import { socket, commands } from "./socket";
  import { game, threads } from "./game";

  let room: string = $state("");
  let sent: boolean = $state(false);
  let dupe: boolean = $state(false);

  commands.set("name_validity", ({ isValid }) => {
    if (!sent) {
      return;
    }

    if (isValid) {
      currentPage.set(QueueScreen);
    } else {
      sent = false;
      dupe = true;
    }
  });

  commands.set("game_state", (obj) => {
    game.set(obj);
  });

  commands.set("thread_set", ({ threadInfo }) => {
    threads.set(threadInfo);
  });

  function submit() {
    socket.send(
      JSON.stringify({
        type: "join_rq",
        name: $name,
        // room,
      })
    );
    sent = true;
  }
</script>

<div class="center-gradient">
  <div class="center">
    <div class="vert">
      <label for="room">Room:</label>
      <input
        id="room"
        type="text"
        bind:value={room}
        placeholder="Enter Server Room"
      />
    </div>
    <div class="vert">
      <label for="name">Name:</label>
      <input
        id="name"
        type="text"
        bind:value={$name}
        placeholder="Enter Name"
      />
      {#if dupe}
        <small id="name-taken">Name taken</small>
      {/if}
    </div>
    <button onclick={submit}>Join</button>
  </div>
</div>

<style>
  #name-taken {
    color: red;
  }
  .center {
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    background-color: #ccc0ff;
    border-radius: 15px;
  }
  .vert {
    display: flex;
    flex-direction: column;
  }
  label {
    font-size: 32px;
    font-weight: bold;
  }
  input {
    background-color: transparent;
    border: none;
    font-family: "Sixtyfour Convergence", serif;
    color: rgba(10, 10, 10, 0.5);
    font-size: 20px;
  }
</style>
