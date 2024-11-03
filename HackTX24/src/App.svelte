<script lang="ts">
  import FirstScreen from "./lib/FirstScreen.svelte";
  import { currentPage } from "./lib/screenManager";

  currentPage.set(FirstScreen);
</script>

<main>
  <div class="card">
    <svelte:component this={$currentPage} />
  </div>
</main>

<style>
</style>
