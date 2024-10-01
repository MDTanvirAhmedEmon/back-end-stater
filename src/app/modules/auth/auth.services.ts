import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const logInUser = async (logInData: ILoginUser): Promise<ILoginUser | null> => {

    const isExist = await User.findOne({ email: logInData.email })
    if (!isExist) {
        throw new AppError(404, 'User not found!')
    }

    const matchedPassword = await bcrypt.compare(logInData?.password, isExist?.password);
    if (!matchedPassword) {
        throw new AppError(401, 'Password do not matched!');
    }
    if (isExist.status === 'blocked') {
        throw new AppError(401, 'User is blocked!')
    }

    return isExist;

}

export const authServices = {
    logInUser,
}