import { NextFunction, Request, Response } from 'express'
import { Secret } from 'jsonwebtoken'
import AppError from '../errors/AppError'
import { verifyToken } from '../helpers/jwtHelper'
import config from '../config'

const auth =
  (...roles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization
        if (!token) {
          throw new AppError(401, 'You are not authorized')
        }

        let verifiedUser = null
        verifiedUser = verifyToken(token, config.jwt_access_secret as Secret)

        if (verifiedUser.status === 'blocked') {
          throw new AppError(403, 'This user is blocked!');
        }

        req.user = verifiedUser // this can accessable from controller

        if (roles.length && !roles.includes(verifiedUser.role)) {
          throw new AppError(403, 'Forbidden')
        }
        next()
      } catch (error) {
        next(error)
      }
    }

export default auth;