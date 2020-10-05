import { Listener, Subjects, TicketUpdatedEvent } from '@et-ticketing/common'
import { queueGroupName } from './queue-group-name'
import { Message } from 'node-nats-streaming'
import { Ticket } from '../../models/ticket'

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
  queueGroupName = queueGroupName

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findByIdAndPreviousVersion(data)

    if (!ticket) throw new Error('Ticket not found')

    const { title, price, version } = data

    ticket.set({ title, price, version })

    await ticket.save()

    msg.ack()
  }
}
