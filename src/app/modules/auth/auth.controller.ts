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
          message: 'User logIn successfully',
          data: others,
        })
    }
    catch (error) {
        next(error)
    }
}

const createRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.cookies;
        console.log(refreshToken)
        const result = await authServices.createRefreshToken(refreshToken)

        console.log('refresh', refreshToken)
        const cookieOptions = {
          secure: config.node_env === 'production',
          httpOnly: true,
        }
    
        res.cookie('refreshToken', refreshToken, cookieOptions)
    
        res.status(200).json({
          success: true,
          message: 'get access token successfully',
          data: result,
        })
    }
    catch (error) {
        next(error)
    }
}

export const authController = {
    logInUser,
    createRefreshToken
}