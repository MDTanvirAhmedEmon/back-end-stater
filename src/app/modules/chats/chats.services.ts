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

export const messageServices = {
    createMessage,
    createAdminMessage,
}