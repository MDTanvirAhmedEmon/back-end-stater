import { Types } from "mongoose";
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

const getUserChats = async (data: any): Promise<IChat[]> => {

    const result = await Chats.find({
        $or: [
            { sender: data?.sender, receiver: data?.receiver },
            { sender: data?.receiver, receiver: data?.sender }
        ]
    })
    return result
}

const getAdminChats = async (data: any) => {
    console.log(data);
    const sender = data?.sender;
    const receiver = data?.receiver;
    const result = await ChatsAdmin.find({
        $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender }
        ]
    });

    return result;

};

const getAlUserWithIChats = async () => {

}
 

export const messageServices = {
    createMessage,
    createAdminMessage,
    getUserChats,
    getAdminChats,
    getAlUserWithIChats,
}