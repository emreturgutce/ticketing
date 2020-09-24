import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { BadRequestError, validateRequest } from '@et-ticketing/common'

const router = Router()

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) throw new BadRequestError('Email in use')

    const user = await User.build({ email, password }).save()

    if (!process.env.JWT_KEY) throw new Error('JWT_KEY not defined')

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY
    )

    req.session = { jwt: userJwt }

    res.status(201).json({ message: 'User created', data: user })
  }
)

export { router as signupRouter }
