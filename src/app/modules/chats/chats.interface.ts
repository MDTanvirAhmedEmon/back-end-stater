import { Types } from "mongoose";

export type IChat = {
    sender: Types.ObjectId
    receiver: Types.ObjectId
    message: string
};

// export type IChatAdmin = {
//     sender: Types.ObjectId | string;
//     receiver: Types.ObjectId | string;
//     senderType: 'Customer' | 'Admin';
//     receiverType: 'Customer' | 'Admin';
//     message: string;  
// };
export type IChatAdmin = {
    sender: string;
    receiver: string;
    message: string;  
};
