import { Document, Model, Schema, model } from 'mongoose'
import { Order, OrderStatus } from './order'

interface TicketAttrs {
  id: string
  title: string
  price: number
}

export interface TicketDoc extends Document {
  title: string
  price: number
  version: number
  isReserved(): Promise<boolean>
}

interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc
  findByIdAndPreviousVersion(event: {
    id: string
    version: number
  }): Promise<TicketDoc | null>
}

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

ticketSchema.set('versionKey', 'version')

ticketSchema.pre('save', function (done) {
  // @ts-ignore
  this.$where = {
    version: this.get('version') - 1,
  }

  done()
})

ticketSchema.statics.build = (attrs: TicketAttrs) =>
  new Ticket({ _id: attrs.id, ...attrs })

ticketSchema.statics.findByIdAndPreviousVersion = (event: {
  id: string
  version: number
}) => {
  return Ticket.findOne({
    _id: event.id,
    version: event.version - 1,
  })
}

ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  })

  return !!existingOrder
}

const Ticket = model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export { Ticket }
