import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.services";

const logInUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginData = req.body;
        const result = await authServices.logInUser(loginData)
        res.status(200).json({
            success: true,
            message: 'user log In successfully',
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

export const authController = {
    logInUser,
}