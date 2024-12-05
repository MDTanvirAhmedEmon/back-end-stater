import { Server } from "socket.io";

const initialChats = (io:Server) => {
    console.log('form initial Chats', io);
}

export default initialChats;