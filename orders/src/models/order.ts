import mongoose, { Document, model, Model, Schema } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { OrderStatus } from '@et-ticketing/common'
import { TicketDoc } from './ticket'

export { OrderStatus }

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
  version: number
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

orderSchema.set('versionKey', 'version')

orderSchema.plugin(updateIfCurrentPlugin)

orderSchema.statics.build = (attrs: OrderAttrs) => new Order(attrs)

const Order = model<OrderDoc, OrderModel>('Order', orderSchema)

export { Order }
