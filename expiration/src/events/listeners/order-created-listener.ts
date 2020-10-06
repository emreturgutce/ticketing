import { Listener, OrderCreatedEvent, Subjects } from '@et-ticketing/common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
  queueGroupName = queueGroupName

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {}
}
