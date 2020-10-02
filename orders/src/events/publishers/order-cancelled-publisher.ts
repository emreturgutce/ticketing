import { OrderCancelledEvent, Publisher, Subjects } from '@et-ticketing/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}
