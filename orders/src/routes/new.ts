import mongoose from 'mongoose'
import { Router, Request, Response } from 'express'
import {
  BadRequestError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@et-ticketing/common'
import { body } from 'express-validator'
import { Ticket } from '../models/ticket'
import { Order, OrderStatus } from '../models/order'
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = Router()

const EXPIRATION_WINDOW_SECONDS = 1 * 60

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body

    // Finding ticket with the given id and making sure it exists
    const ticket = await Ticket.findById(ticketId)

    if (!ticket) throw new NotFoundError()

    // Making sure the ticket with the given id is not reserved
    const isReserved = await ticket.isReserved()

    if (isReserved) throw new BadRequestError('Ticket is already reserved')

    // Calculating expiration date
    const expiration = new Date()
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    })

    await order.save()

    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: ticket.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    })

    res.status(201).json({ order })
  }
)

export { router as newOrderRouter }
