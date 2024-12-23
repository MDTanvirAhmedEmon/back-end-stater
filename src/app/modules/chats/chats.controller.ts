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

const getAlUserWithIChats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentUserId = req.params.id
    const result = await messageServices.getAlUserWithIChats(currentUserId)

    res.status(200).json({
      success: true,
      message: 'Get All Users I Chats Successfully',
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
    getAlUserWithIChats,
}