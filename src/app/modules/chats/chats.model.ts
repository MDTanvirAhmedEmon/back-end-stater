import { model, Schema } from "mongoose";
import { IChat } from "./chats.interface";

const chatsSchema: Schema<IChat> = new Schema({
    sender:
    {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'Customer',
    },
    receiver:
    {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'Customer',
    },
    message:
    {
        type: String, required: true
    }
}, {
    timestamps: true
});

export const Chats = model<IChat>('Chats', chatsSchema);