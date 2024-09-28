import { Request, Response } from "express";
import { customerServices } from "./user.services";


const createCustomer = async (req: Request, res: Response) => {
    try {
        const {userInfo, customerData} = req.body;
        console.log(userInfo, customerData)
        const result = await customerServices.createCustomer(userInfo, customerData);
        res.status(200).json({
            success: true,
            message: 'user created successfully',
            data: result,
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'something went wrong',
            data: null,
        })
    }
}

export const customerController = {
    createCustomer,
}