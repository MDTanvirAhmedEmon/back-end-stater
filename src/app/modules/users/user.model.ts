import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    Request: true
  },
  role: {
    required: true,
    enum: ['customer', 'admin']
  },
  status: {
    required: true,
    enum: ['in-progress', 'blocked']
  },
}, 
{
  timestamps: true
});

export const User = model<IUser>('User', userSchema);