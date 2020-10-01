import mongoose, { Document, model, Model, Schema } from 'mongoose'
import { OrderStatus } from '@et-ticketing/common'
import { TicketDoc } from './ticket'

interface OrderAttrs {
  userId: string
  status: OrderStatus
  expiresAt: Date
  ticket: TicketDoc
}

interface OrderDoc extends Document {
  userId: string
  status: OrderStatus
  expiresAt: Date
  ticket: TicketDoc
}

interface OrderModel extends Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc
}

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
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

orderSchema.statics.build = (attrs: OrderAttrs) => new Order(attrs)

const Order = model<OrderDoc, OrderModel>('Order', orderSchema)

export { Order }
