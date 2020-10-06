import { OrderStatus } from '@et-ticketing/common'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { Order } from '../../models/order'

it('returns a 404 if the order does not exist', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signup())
    .send({
      token: 'asfasfasf',
      orderId: mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404)
})

it('returns a 401 if the order does not belong to the user', async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Created,
    userId: 'asfafsaf',
    version: 0,
  })

  await order.save()

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signup())
    .send({
      token: 'asfasfasf',
      orderId: order.id,
    })
    .expect(401)
})

it('returns a 400 if the order is cancelled', async () => {
  const userId = mongoose.Types.ObjectId().toHexString()

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Cancelled,
    userId,
    version: 0,
  })

  await order.save()

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signup(userId))
    .send({
      token: 'asfasfasf',
      orderId: order.id,
    })
    .expect(400)
})
