<script lang="ts">
  import { socket, commands } from "./socket";

  let elapsed: number = $state(0);
  let loaded: boolean = $state(false);

  commands.set("game_start", () => {});

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
</script>

<div class="center-gradient">
  <div class="center">
    <div class="vert">
      <label for="loading-image"
        >Waiting for the current game to finish{".".repeat(elapsed)}</label
      >
      <img
        id="loading-image"
        src="WalkingCat.gif"
        alt=""
        width="100px"
        height="100px"
      />
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
  input {
    background-color: transparent;
    border: none;
    font-family: "Sixtyfour Convergence";
    color: rgba(10, 10, 10, 0.5);
    font-size: 20px;
  }
</style>
