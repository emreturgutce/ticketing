import { Message } from 'node-nats-streaming'
import {
  ExpirationCompleteEvent,
  Listener,
  OrderStatus,
  Subjects,
} from '@et-ticketing/common'
import { queueGroupName } from './queue-group-name'
import { Order } from '../../models/order'
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher'

export class ExpirationCompleteListener extends Listener<
  ExpirationCompleteEvent
> {
  readonly subject = Subjects.ExpirationComplete
  queueGroupName = queueGroupName

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate('ticket')

    if (!order) throw new Error('Order not found')

    order.set({ status: OrderStatus.Cancelled })

    await order.save()

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id,
      },
      version: order.version,
    })
  }
}
