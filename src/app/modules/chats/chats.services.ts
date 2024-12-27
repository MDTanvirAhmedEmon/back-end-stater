import { Types } from "mongoose";
import { IChat, IChatAdmin } from "./chats.interface"
import { Chats, ChatsAdmin } from "./chats.model"


const createMessage = async (data: IChat): Promise<any> => {
    // console.log('service',data);
    const result = await Chats.create(data)
    const populatedResult = await result.populate('sender receiver');
    return populatedResult;
}

const createAdminMessage = async (data: IChatAdmin): Promise<any> => {

    const result = await ChatsAdmin.create(data)
    return result;
}

const getUserChats = async (data: any): Promise<IChat[]> => {

    const result = await Chats.find({
        $or: [
            { sender: data?.sender, receiver: data?.receiver },
            { sender: data?.receiver, receiver: data?.sender }
        ]
    })
    return result
}

const getAdminChats = async (data: any) => {
    console.log(data);
    const sender = data?.sender;
    const receiver = data?.receiver;
    const result = await ChatsAdmin.find({
        $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender }
        ]
    });

    return result;

};

const getAlUserWithIChats = async (currentUserId: string) => {
    try {
        const result = await Chats.aggregate([
            {
                $match: {
                    $or: [
                        { sender: new Types.ObjectId(currentUserId) },
                        { receiver: new Types.ObjectId(currentUserId) },
                    ],
                },
            },
            {
                $project: {
                    otherUser: {
                        $cond: {
                            if: { $eq: ["$sender", new Types.ObjectId(currentUserId)] },
                            then: "$receiver",
                            else: "$sender",
                        },
                    },
                    message: 1,
                    createdAt: 1,
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $group: {
                    _id: "$otherUser",
                    lastMessage: { $first: "$message" },
                    lastMessageDate: { $first: "$createdAt" },
                },
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails",
                },
            },
            {
                $unwind: "$userDetails",
            },
            {
                $project: {
                    _id: 1,
                    firstName: "$userDetails.firstName",
                    lastName: "$userDetails.lastName",
                    contactNo: "$userDetails.contactNo",
                    profileImageUrl: "$userDetails.profileImageUrl",
                    lastMessage: 1,
                    lastMessageDate: 1,
                },
            },
            {
                $sort: { lastMessageDate: -1 },
            },
        ]);

        return result;

    } catch (error) {
        console.error("Error fetching chat users:", error);
        throw error;
    }
}


export const messageServices = {
    createMessage,
    createAdminMessage,
    getUserChats,
    getAdminChats,
    getAlUserWithIChats,
}