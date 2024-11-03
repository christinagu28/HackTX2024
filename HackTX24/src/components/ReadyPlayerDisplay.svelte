<script lang="ts">
    // if we're using svelte might as use components
    import {lobbyState} from "../lib/state.svelte";
    import {getIconFor} from "../lib/icons";

    const { untypedName } = $props();
    const name = untypedName as string;
    let ready = $derived(lobbyState.data[name]);
    let color = $derived(ready ? '#209820' : '#dc0a38');
    let text = $derived(ready ? 'ready!' : 'waiting');
    const iconUrl = getIconFor(name);
</script>

<div>
    <img src={iconUrl} alt="an icon" />
    
    <p>{name}</p>
    <span style="color: {color}">{text}</span>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    
    div > * {
        font-size: 20px;
        margin: 10px;
    }
    
     div > p {
         padding: 0 3em 0 3em;
     }
    
    img {
        margin-top: 0;
    }
</style>