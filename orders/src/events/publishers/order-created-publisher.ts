import { Publisher, OrderCreatedEvent, Subjects } from '@et-ticketing/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
}
