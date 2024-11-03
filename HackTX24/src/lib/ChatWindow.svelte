<script lang="ts">
    let messages = $state([""]);
    let {player = "Test Player"} = $props();
    let text = $state("");
    import CloseChat from '../../public/Close-Chat.svg';
    import Send from '../../public/Send.svg';

    const closeChat = () => {
        console.log("Closing chat");
    }
    const enterListener = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    }
    const sendMessage = () => {
        if (text.trim() === "") {
            return;
        }
        //add another message to the chat
        text = "\<span style='font-weight: bold' \>" + player.toString() + "\</span\>: " + text.trim();
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
    font-family: "hun", serif;
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
    background-color: rgba(204, 192, 255, 0.8);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    color: #000000;
  }
  .text {
    width: 80%;
    padding: 0.5em;
    margin: 0;
    border: 1px solid #ccc;
    border-radius: 0.5em;
  }
  .row {
    padding-top: 1em;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .send-message {
    color: white;
    padding: 0;
    will-change: filter;
    transition: filter 300ms;
    font-size: 0;
    margin: 0;
  }
  .scrollable {
    overflow-y: auto;
    /*overflow: auto;*/
    height: 100%;
    display: inline-block;
  }
  .scrollable::-webkit-scrollbar {
    display: none;
  }
</style>
<div class="card">
    <div class="card-top">
        <h2>Question and Answer That will probably take two lines because it is long</h2>
        <p>Sender and Receiver</p>
        <button onclick={closeChat} class="close-chat">
            <img src={CloseChat} alt="Close Chat"/>
        </button>
    </div>
    <div class="scrollable">
        {#each messages as message}
            <p>{@html message}</p>
        {/each}
    </div>
    <div class="row">
        <input class="text" type="text" placeholder="Enter text here" bind:value={text} onkeydown={enterListener}>
        <button onclick={sendMessage} class="send-message">
            <img src={Send} alt="Send" height="40px" width="40px"/>
        </button>
    </div>
</div>
<!--<img src={CloseChat} class="close-chat" alt="Close Chat" onclick={CloseChat}/>-->