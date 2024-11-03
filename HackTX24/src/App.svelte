<script lang="ts">
  import FirstScreen from "./lib/FirstScreen.svelte";
  import { currentPage } from "./lib/screenManager";
  import ChatWindow from "./lib/ChatWindow.svelte";
  currentPage.set(FirstScreen);
  // currentPage.set(ChatWindow);
</script>

<main>
  <div class="card">
    <svelte:component this={$currentPage} />
  </div>
</main>

<style>
</style>
