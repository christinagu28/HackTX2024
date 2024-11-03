<script lang="ts">
    import {next, sendData} from "../lib/socket.svelte";
    import {finishNameScreen} from "../lib/state.svelte";

    let name = $state('');
    let triedBefore = $state(false);
    let inProcess = $state(false);

    async function submit() {
        inProcess = true;
        await sendData({type: 'join_rq', 'name': name})
        const response = (await next('name_validity')).isValid;
        if (response) {
            // we done yippee
            finishNameScreen($state.snapshot(name));
        } else {
            inProcess = false;
            triedBefore = true;
            name = '';
        }
    }
</script>


<div>
    <form on:submit|preventDefault={submit}>
        <p class="title">Spyfall</p>
        <input bind:value={name} placeholder="Enter your name"/>
        <button disabled={name === '' || inProcess}>submit!</button>

        {#if triedBefore}
            <p>that name has already been taken!</p>
        {/if}
    </form>
</div>

<style>
    form {
        display: flex;
        flex-direction: column;
    }

    form > *, :not(.title) {
        padding: 7px;
        margin: 0.7em;
    }

    .title {
        padding: -7px;
        margin: 0 -10px 0 -10px;
        font-family: 'Sixtyfour Convergence', sans-serif;
        font-size: 100px;
    }

    button {
        background: rgba(119, 48, 164, 0.99);
    }
    
    input {
        background: transparent;
        border: 3px solid transparent;
        box-shadow: none;
        outline: none;
        transition: 0.2s;
    }
    
    input:focus {
        border-bottom-color: white;
    }

    div {
        background: rgba(16, 8, 21, 0.99);
        padding: 4em;
        border-radius: 30px;
    }
</style>