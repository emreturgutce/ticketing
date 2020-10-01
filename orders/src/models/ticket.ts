import { Document, Model, Schema, model } from 'mongoose'

interface TicketAttrs {
  title: string
  price: number
}

interface TicketDoc extends Document {
  title: string
  price: number
}

interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc
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

ticketSchema.statics.build = (attrs: TicketAttrs) => new Ticket(attrs)

const Ticket = model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export { Ticket }
