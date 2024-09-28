import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'admin']
  },
  status: {
    type: String,
    enum: ['in-progress', 'blocked']
  },
}, 
{
  timestamps: true
});

export const User = model<IUser>('User', userSchema);