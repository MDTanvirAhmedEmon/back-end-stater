import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

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

// mongoose pre middleware 

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))

  next();
})

export const User = model<IUser>('User', userSchema);