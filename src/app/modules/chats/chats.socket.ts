import { Server } from "socket.io";

const initialChats = (io: Server) => {
    // console.log('form initial Chats', io);
    const chatNamespace = io.of('/chats')
    chatNamespace.on('connection', (socket) => {
        console.log('User', socket.id);

        //receive using on send using emit
        socket.on("send", (data) => {
            console.log(data, 'ddddddd');
            socket.emit("reci", { data: "sender emon" })
        })
    })
}

export default initialChats;