import AppError from '../../errors/AppError';
import { Customer } from '../customers/customer.model';
import { ICustomer } from './../customers/customer.interface';
import { IUser } from "./user.interface";
import { User } from "./user.model"

const createCustomer = async (validateUserInfo: Partial<IUser>, validateCustomerData: ICustomer): Promise<ICustomer | undefined> => {
    const userData = {
        email: validateUserInfo?.email,
        password: validateUserInfo?.password,
        role: "customer",
        status: 'in-progress',
    }
    const isExist = await User.findOne({ email: userData.email })
    console.log(isExist)
    if (isExist) {
        throw new AppError(400, 'User already exists!')
    }

    const result = await User.create(userData);
    console.log('result', result)

    if (result?._id) {
        validateCustomerData.user = result?._id
        const customerResult = await Customer.create(validateCustomerData)
        return customerResult
    }
}

export const customerServices = {
    createCustomer,
}