import { IChat, IChatAdmin } from "./chats.interface"
import { Chats, ChatsAdmin } from "./chats.model"


const createMessage = async (data: IChat): Promise<any> => {
    // console.log('service',data);
    const result = await Chats.create(data)
    const populatedResult = await result.populate('sender receiver');
    return populatedResult;
}

const createAdminMessage = async (data: IChatAdmin): Promise<any> => {

    const result = await ChatsAdmin.create(data)
    return result;
}

const getUserChats = async (data:any):Promise<IChat[]> => {

    const result = await Chats.find({
        $or: [
            { sender: data?.sender, receiver: data?.receiver },
            { sender: data?.receiver, receiver: data?.sender }
        ]
    })
    return result
}

const getAdminChats = async (data:any):Promise<IChatAdmin[]> => {
    console.log(data);

    const result = await ChatsAdmin.find({
        $or: [
            { sender: data?.sender, receiver: data?.receiver },
            { sender: data?.receiver, receiver: data?.sender }
        ]
    }).exec();
    console.log(result);
    return result
}

export const messageServices = {
    createMessage,
    createAdminMessage,
    getUserChats,
    getAdminChats,
}