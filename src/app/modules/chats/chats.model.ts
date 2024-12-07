import { string } from 'zod';
import { model, Schema } from "mongoose";
import { IChat, IChatAdmin } from "./chats.interface";

const chatsSchema: Schema<IChat> = new Schema({
    sender:
    {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        ref: 'Customer',
    },
    receiver:
    {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
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


// const chatsAdminSchema: Schema<IChatAdmin> = new Schema(
//     {
//         sender: {
//           type: Schema.Types.ObjectId, string,
//           required: [true, 'Sender is required'],
//           refPath: 'senderType', // Dynamically reference based on senderType field
//         },
//         receiver: {
//           type: Schema.Types.ObjectId , string,
//           required: [true, 'Receiver is required'],
//           refPath: 'receiverType', // Dynamically reference based on receiverType field
//         },
//         senderType: {
//           type: String,
//           required: true,
//           enum: ['Customer', 'Admin'],  // Allowed values are 'Customer' or 'Admin'
//         },
//         receiverType: {
//           type: String,
//           required: true,
//           enum: ['Customer', 'Admin'],  // Allowed values are 'Customer' or 'Admin'
//         },
//         message: {
//           type: String,
//           required: [true, 'Message is required'],
//         },
//       },
//       {
//         timestamps: true,
//       }
//   );
  
//   export const ChatsAdmin = model<IChatAdmin>('ChatsAdmin', chatsAdminSchema);


const chatsAdminSchema: Schema<IChatAdmin> = new Schema(
    {
        sender: {
          type: String,  // Allowing both ObjectId and string
          required: [true, 'Sender is required'],
        },
        receiver: {
          type: String,  // Allowing both ObjectId and string
          required: [true, 'Receiver is required'],
        },
        message: {
          type: String,
          required: [true, 'Message is required'],
        },
      },
      {
        timestamps: true,
      }
  );
  
  export const ChatsAdmin = model<IChatAdmin>('ChatsAdmin', chatsAdminSchema);