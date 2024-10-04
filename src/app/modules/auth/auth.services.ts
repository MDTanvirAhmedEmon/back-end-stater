import { Secret } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken, verifyToken } from '../../helpers/jwtHelper';
import { User } from '../users/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const logInUser = async (logInData: ILoginUser): Promise<any> => {

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

  const tokenPayload = {
    email: isExist.email,
    id: isExist._id,
    role: isExist.role,
  }

  const accessToken = createToken(
    tokenPayload,
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string,
  )
  const refreshToken = createToken(
    tokenPayload,
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string,
  )

  return {
    refreshToken,
    accessToken,
  }

}

const createRefreshToken = async (token: string): Promise<any> => {

  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(
      token,
      config.jwt_refresh_secret as Secret
    );
  } catch (err) {
    throw new AppError(403, 'Invalid Refresh Token');
  }

  const { id } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new AppError(404, 'User does not exist');
  }
  //generate new token

  const tokenPayload = {
    email: isExist.email,
    id: isExist._id,
    role: isExist.role,
  }

  const accessToken = createToken(
    tokenPayload,
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string,
  )

  return {
    accessToken
  }

}



const changePassword = async (logInData: ILoginUser): Promise<any> => {

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

  const tokenPayload = {
    email: isExist.email,
    id: isExist._id,
    role: isExist.role,
  }

  const accessToken = createToken(
    tokenPayload,
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string,
  )
  const refreshToken = createToken(
    tokenPayload,
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string,
  )

  return {
    refreshToken,
    accessToken,
  }

}

export const authServices = {
  logInUser,
  createRefreshToken,
  changePassword,
}