import { model, Schema } from "mongoose";
import { ICustomer } from "./customer.interface";

const customerSchema: Schema<ICustomer> = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others'],
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    profileImageUrl: { type: String },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'User',
    }
}, {
    timestamps: true
});

export const Customer = model<ICustomer>('Customer', customerSchema);