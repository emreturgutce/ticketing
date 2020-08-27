import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { RequestValidationError } from '../errors/request-validation-error'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) throw new RequestValidationError(errors.array())

    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) throw new BadRequestError('Email in use')

    const user = await User.build({ email, password }).save()

    const userJwt = jwt.sign({ id: user.id, email: user.email }, 'ASDF')

    req.session = { jwt: userJwt }

    res.status(201).json({ message: 'User created', data: user })
  }
)

export { router as signupRouter }
