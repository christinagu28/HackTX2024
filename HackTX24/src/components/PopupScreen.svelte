<script lang="ts">
  import type { PopupEvent } from "../lib/popup";
  import { popupQueue } from "../lib/popup";

  let popupVisible = $state(false);
  let popupState = $state<PopupEvent>();

  function hidePopup() {
    popupVisible = false;
  }
  function loadPopup() {
    if (!popupVisible && $popupQueue.length > 0) {
      popupState = $popupQueue.shift();

      if (popupState?.timed) {
        popupState.blocking = true;
        setTimeout(hidePopup, 4500);
      }
    }
  }

  popupQueue.subscribe(() => {
    if (popupVisible) {
      return;
    }

    loadPopup();
  });

  $effect(loadPopup);
</script>

{#if popupVisible}
  <div class="full-popup">
    <div class="popup">
      {#if popupState && !popupState.blocking}
        <div class="top-panel">
          <button onclick={hidePopup}>X</button>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  button {
    background-color: transparent;
  }
  .full-popup {
    z-index: 50;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    background-color: rgba(10, 5, 20, 0.7);

    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
  }
  .top-panel {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row-reverse;
  }
  .popup {
    margin: auto;
    min-width: 35%;
    min-height: 40%;
    max-width: 85%;
    max-height: 90%;
    border-radius: 12px;
    background-color: #b2a0f1;
  }
</style>
