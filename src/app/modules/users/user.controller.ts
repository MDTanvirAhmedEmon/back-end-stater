import { NextFunction, Request, Response } from "express";
import { customerServices } from "./user.services";
import { userValidationSchema } from "./user.validation";
import { customerValidatedSchema } from "../customers/customer.validation";


const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userInfo, customerData } = req.body;
        console.log(userInfo, customerData);
        // console.log(userInfo, customerData)
        const validateUserInfo = userValidationSchema.parse(userInfo)
        const validateCustomerData = customerValidatedSchema.parse(customerData)
        const result = await customerServices.createCustomer(validateUserInfo, validateCustomerData);
        res.status(200).json({
            success: true,
            message: 'user created successfully',
            data: result,
        })
        // sendResponse(res, {
        //     statusCode: httpStatus.OK,
        //     success: true,
        //     message: 'user created successfully',
        //     data: result,
        // });
    }
    catch (error) {
        next(error)
    }
}

export const customerController = {
    createCustomer,
}