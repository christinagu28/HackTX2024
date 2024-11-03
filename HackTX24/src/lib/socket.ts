import { Manager } from "socket.io-client";
//socket takes commands to do on some broadcast

const url = "https://5d1f-128-62-70-92.ngrok-free.app/ws";

const socket = new WebSocket(url);
const commands = new Map<string, (ev: any) => void>();

if (socket) {
  socket.onopen = (e) => {
    // console.log(e);
  };
  socket.onmessage = (m) => {
    console.log(m);
    const response = JSON.parse(m.data);
    const commandName = response.type;

    const command = commands.get(commandName);
    if (command) {
      command(response);
    }
  };
  socket.onerror = (e) => {
    // console.log(e);
  };
}

export { socket, commands };
