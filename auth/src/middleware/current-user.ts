import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) return next()

  if (!process.env.JWT_KEY) throw new Error('JWT_KEY not defined')

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY
    ) as UserPayload

    req.currentUser = payload
  } catch (err) {}
  next()
}
