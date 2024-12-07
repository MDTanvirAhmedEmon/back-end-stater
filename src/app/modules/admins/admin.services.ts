import AppError from "../../errors/AppError"
import { IAdmin } from "./admin.interface"
import { Admin } from "./admin.model"


const createAdmin = async (data: IAdmin): Promise<IAdmin> => {
    const isExist = await Admin.findOne({ email: data?.email })
    if (isExist) {
        throw new AppError(409, 'Admin already exist!')
    }
    const result = await Admin.create(data)
    return result
}



export const adminServices = {
    createAdmin,
}