<script lang="ts">
    
import ChatBox from "./ChatBox.svelte";
</script>

<div class="container">
<div class="thread-div">
    <ChatBox/>
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