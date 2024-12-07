import { IChat } from "./chats.interface"
import { Chats } from "./chats.model"


const createMessage = async (data: IChat): Promise<IChat> => {
    console.log('service',data);
    const result = await Chats.create(data)
    return result
}

export const messageServices = {
    createMessage,
}