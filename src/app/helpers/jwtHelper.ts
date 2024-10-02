import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

export const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireDuration: string,
): string => {
  return jwt.sign(payload, secret, { expiresIn: expireDuration })
}

export const verifyToken = (payload: string, secret: Secret): JwtPayload => {
  return jwt.verify(payload, secret) as JwtPayload
}