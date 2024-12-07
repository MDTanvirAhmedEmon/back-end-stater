import { NextFunction, Request, Response } from "express";
import { messageServices } from "./chats.services";


const getUserChats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.query
    const result = await messageServices.getUserChats(data)


    res.status(200).json({
      success: true,
      message: 'Get All Message Successfully',
      data: result,
    })
  }
  catch (error) {
    next(error)
  }
}


const getAdminChats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.query
    const result = await messageServices.getAdminChats(data)

    res.status(200).json({
      success: true,
      message: 'Get All Message Successfully',
      data: result,
    })
  }
  catch (error) {
    next(error)
  }
}

export const chatsController = {
    getUserChats,
    getAdminChats,
}