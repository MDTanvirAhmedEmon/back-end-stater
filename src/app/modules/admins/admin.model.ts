import { model, Schema } from "mongoose";
import { IAdmin } from "./admin.interface";


const adminSchema = new Schema<IAdmin>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNo: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin"],
        required: true
    },
    status: {
        type: String,
        enum: ["in-progress", "blocked"],
        required: true
    },
}, {
    timestamps: true,
});

export const Admin = model<IAdmin>('Admin', adminSchema);