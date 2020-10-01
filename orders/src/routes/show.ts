import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@et-ticketing/common'
import { Router, Request, Response } from 'express'
import { param } from 'express-validator'
import { Order } from '../models/order'
import mongoose from 'mongoose'

const router = Router()

router.get(
  '/api/orders/:orderId',
  requireAuth,
  [
    param('orderId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('orderId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket')

    if (!order) throw new NotFoundError()

    // Making sure user really owns the order
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError()

    res.json({ order })
  }
)

export { router as showOrderRouter }
