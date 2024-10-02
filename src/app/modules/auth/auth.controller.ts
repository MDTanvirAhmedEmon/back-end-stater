import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.services";
import config from "../../config";

const logInUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginData = req.body;
        const result = await authServices.logInUser(loginData)

        const { refreshToken, ...others } = result
        console.log('refresh', refreshToken)
        const cookieOptions = {
          secure: config.node_env === 'production',
          httpOnly: true,
        }
    
        res.cookie('refreshToken', refreshToken, cookieOptions)
    
        res.status(200).json({
          success: true,
          message: 'User created successfully',
          data: others,
        })
    }
    catch (error) {
        next(error)
    }
}

export const authController = {
    logInUser,
}