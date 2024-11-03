<script lang="ts">
  import { display } from "./lib/state.svelte";
  import PopupScreen from "./components/PopupScreen.svelte";
</script>

<PopupScreen />
<main>
  <svelte:component this={display.page} />
</main>

<style>
</style>
