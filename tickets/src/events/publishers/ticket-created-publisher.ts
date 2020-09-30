import { Publisher, Subjects, TicketCreatedEvent } from '@et-ticketing/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
