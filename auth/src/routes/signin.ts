import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { validateRequest, BadRequestError } from '@et-ticketing/common'
import { User } from '../models/user'
import { Password } from '../services/password'

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
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (!existingUser) throw new BadRequestError('poor credentials')

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    )

    if (!passwordsMatch) throw new BadRequestError('poor credentials')

    if (!process.env.JWT_KEY) throw new Error('JWT_KEY not defined')

    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY
    )

    req.session = { jwt: userJwt }

    res.status(200).json({ message: 'Signed in', data: existingUser })
  }
)

export { router as signinRouter }
