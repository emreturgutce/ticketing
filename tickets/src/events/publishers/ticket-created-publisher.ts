import { Publisher, Subjects, TicketCreatedEvent } from '@et-ticketing/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
}
