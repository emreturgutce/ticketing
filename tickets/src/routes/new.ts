import { Router, Request, Response } from 'express'
import { requireAuth, validateRequest } from '@et-ticketing/common'
import { body } from 'express-validator'

const router = Router()

router.post('/api/tickets', requireAuth, [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0')
], validateRequest, (req: Request, res: Response) => {})

export { router as createTicketRouter }