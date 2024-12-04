import { Types } from "mongoose";

export type IChat = {
    sender: Types.ObjectId
    receiver: Types.ObjectId
    message: string
};
