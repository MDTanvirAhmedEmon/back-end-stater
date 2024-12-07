import { NextFunction, Request, Response } from "express";
import { adminServices } from "./admin.services";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    // console.log(data);
    const result = await adminServices.createAdmin(data)

    res.status(200).json({
      success: true,
      message: 'Admin Created Successfully',
      data: result,
    })
  }
  catch (error) {
    next(error)
  }
}

export const adminController = {
    createAdmin,
}