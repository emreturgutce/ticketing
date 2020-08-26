import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../errors/not-found-error'

export const notFound = (req: Request, res: Response) => {
  throw new NotFoundError()
}
