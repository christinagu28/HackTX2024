<script long="ts">
    let messages = $state([""]);
    let {player = "Test Player"} = $props();
    let text = $state("");
    import CloseChat from '../public/Close-Chat.svg';
    import Send from '../public/Send.svg';

    const closeChat = () => {
        console.log("Closing chat");
    }
    const sendMessage = () => {
        if (text.trim() === "") {
            return;
        }
        //add another message to the chat
        text = "\<strong\>" + player.toString() + "\</strong\>: " + text.trim();
        console.log("Sending message", text);
        messages.push(text);
        console.log($state.snapshot(messages));
        text = "";
    }
</script>

<style>
  .close-chat {
    padding: 0;
    will-change: filter;
    transition: filter 300ms;
    font-size: 0;
    margin: 0;
    position: absolute;
    right: 3%;
    top: 5%;
  }
  .card {
    border: 1px solid #ccc;
    border-radius: 0.5em;
    width: 25%;
    height: 70%;
    margin: 1em;
    text-align: left;
    line-height: 1;
    position: absolute;
    left: 3%;
    top: 5%;
    padding: 1em;
  }
  .text {
    width: 70%;
    padding: 0.5em;
    margin: 0.5em 0;
    border: 1px solid #ccc;
    border-radius: 0.5em;
  }
  .row {
    width: 100%;
  }
  .send-message {
    color: white;
    padding: 0;
    will-change: filter;
    transition: filter 300ms;
    font-size: 0;
    margin: 0;
    position: relative;
    bottom: 5%;
  }
</style>
<div class="card">
    <h2>Question and Answer</h2>
    <p>Sender and Receiver</p>
    {#each messages as message}
        <p>{@html message}</p>
    {/each}
    <button onclick={closeChat} class="close-chat">
        <img src={CloseChat} alt="Close Chat"/>
    </button>
    <div class="row">
        <input class="text" type="text" placeholder="Enter text here" bind:value={text}>
        <button onclick={sendMessage} class="send-message">
            <img src={Send} alt="Send"/>
        </button>
    </div>
</div>
<!--<img src={CloseChat} class="close-chat" alt="Close Chat" onclick={CloseChat}/>-->