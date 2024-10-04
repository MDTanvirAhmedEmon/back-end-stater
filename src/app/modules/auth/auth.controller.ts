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

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const data = req.body;
    console.log(user)
    console.log(data)
    const result = await authServices.changePassword(user, data)

    res.status(200).json({
      success: true,
      message: 'changed password successfully',
    })
  }
  catch (error) {
    next(error)
  }
}

const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const result = await authServices.forgetPassword(email)

    res.status(200).json({
      success: true,
      message: 'sent verification code successfully',
    })
  }
  catch (error) {
    next(error)
  }
}

const verifyCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await authServices.verifyCode(data)

    res.status(200).json({
      success: true,
      message: 'code is verified successfully',
    })
  }
  catch (error) {
    next(error)
  }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await authServices.resetPassword(data)

    res.status(200).json({
      success: true,
      message: 'Reset password successfully',
    })
  }
  catch (error) {
    next(error)
  }
}

export const authController = {
  logInUser,
  createRefreshToken,
  changePassword,
  forgetPassword,
  verifyCode,
  resetPassword,
}