import { Server } from "socket.io";
import { messageServices } from "./chats.services";

const initialChats = (io: Server) => {
    // console.log('form initial Chats', io);
    const chatNamespace = io.of('/chats')
    chatNamespace.on('connection', (socket) => {
        console.log('User', socket.id);

        //receive using on send using emit
        socket.on("sendUser", async (data) => {
            const dbMessage = await messageServices.createMessage(data)
            // console.log('sdfhsdalfdsa;fj', data);
            socket.emit(`received${dbMessage?.sender}`, { message: dbMessage?.message })
            socket.emit(`received${dbMessage?.receiver}`, { message: dbMessage?.message })
        })
    })
}

export default initialChats;