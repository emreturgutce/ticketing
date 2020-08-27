import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middleware/validate-request'

const router = Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.send('Hello World')
  }
)

export { router as signinRouter }
