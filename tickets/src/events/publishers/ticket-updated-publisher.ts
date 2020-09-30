import { Publisher, Subjects, TicketUpdatedEvent } from '@et-ticketing/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}
