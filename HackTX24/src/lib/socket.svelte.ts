export const socket: WebSocket = new WebSocket("http://localhost:8080/ws");
// for each expr that returns a non-undefined value
export const commands: { [key: string]: ((input: { type: string }) => any | undefined)[] | undefined } = {};

// if we cant access, this client is doomed
if (!socket) {
    alert("can't connect to the server...")
}

// btw don't worry abt the ts magic here
socket.onopen = (e) => console.log('created websocket:', e);
socket.onerror = (e) => console.warn('websocket err! ', e)
socket.onmessage = (m) => {
    const value: { type: string } = JSON.parse(m.data);
    console.log('received message: value = ', value);
    const type = value.type
    const ops = commands[type];
    if (ops !== undefined) {
        const newArr = [];
        for (let i = 0; i < ops.length; i++) {
            if (ops[i](value) !== 0) newArr.push(ops[i]);
        }
        commands[type] = newArr;
    }
};

// runs the given exec whenever we get the data type, but stops if the 
// function returns 0
export function on(dataType: string, exec: (input: { type: string } & any) => any) {
    if (commands[dataType]) commands[dataType]!.push(exec) 
    else commands[dataType] = [exec]
}

// sends the data (and logs it!)
export async function sendData(obj: { type: string } | unknown) {
    const stringRep = JSON.stringify(obj);
    console.log('sending message to server: value = ', stringRep);
    socket.send(stringRep)
}

// returns the next item of the data type that comes
// promise, so u can wait for multiple and take the first using promise.race
export async function next(dataType: string): Promise<{ type: string } & any> {
    console.log('awaiting promise for data type ', dataType)
    return new Promise<{ type: string }>((resolve, _) => {
        on(dataType, (input) => {
            resolve(input);
            return 0; // so it gets removed from the next iteration
        });
    });
}

// upd state now
