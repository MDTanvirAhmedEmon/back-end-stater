import { Customer } from '../customers/customer.model';
import { ICustomer } from './../customers/customer.interface';
import { IUser } from "./user.interface";
import { User } from "./user.model"

const createCustomer = async (userInfo: Partial<IUser>, customerData: ICustomer): Promise<ICustomer | undefined> => {
    const userData = {
        email: userInfo?.email,
        password: userInfo?.password,
        role: "customer",
        status: 'in-progress',
    }
    const result = await User.create(userData);

    if (result?._id) {
        customerData.user = result?._id
        const customerResult = await Customer.create(customerData)
        return customerResult
    }
}

export const customerServices = {
    createCustomer,
}