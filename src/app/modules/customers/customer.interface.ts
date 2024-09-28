import { Types } from "mongoose";

export type ICustomer = {
    firstName: string
    lastName: string
    address: string
    gender: 'male' | 'female' | 'others'
    contactNo: string
    profileImageUrl?: string
    user?: Types.ObjectId
}