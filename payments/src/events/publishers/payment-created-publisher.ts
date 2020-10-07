import { PaymentCreatedEvent, Publisher, Subjects } from '@et-ticketing/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated
}
