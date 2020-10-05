import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { natsWrapper } from '../../nats-wrapper'
import { Ticket } from '../../models/ticket'

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signup())
    .send({
      title: 'asdasd',
      price: 20,
    })
    .expect(404)
})

it('return a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'asdasd',
      price: 20,
    })
    .expect(401)
})

it('returns a 401 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'asdasd',
      price: 20,
    })

  await request(app)
    .put(`/api/tickets/${response.body.ticket.id}`)
    .set('Cookie', global.signup())
    .send({
      title: 'asdasdasdasd',
      price: 20,
    })
    .expect(401)
})

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signup()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asdasd',
      price: 20,
    })

  await request(app)
    .put(`/api/tickets/${response.body.ticket.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400)

  await request(app)
    .put(`/api/tickets/${response.body.ticket.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'asdasd',
      price: -20,
    })
    .expect(400)
})

it('updates the ticket provided valid inputs', async () => {
  const cookie = global.signup()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asdasd',
      price: 20,
    })

  await request(app)
    .put(`/api/tickets/${response.body.ticket.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 100,
    })
    .expect(200)

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.ticket.id}`)
    .send()

  expect(ticketResponse.body.ticket.title).toEqual('new title')
  expect(ticketResponse.body.ticket.price).toEqual(100)
})

it('publishes an event', async () => {
  const cookie = global.signup()

  await request(app).post('/api/tickets').set('Cookie', cookie).send({
    title: 'asdasd',
    price: 20,
  })

  expect(natsWrapper.client.publish).toHaveBeenCalled()
})

it('rejects updates if the ticket is reserved', async () => {
  const cookie = global.signup()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asdasd',
      price: 20,
    })

  const ticket = await Ticket.findById(response.body.ticket.id)

  ticket!.set({ orderId: mongoose.Types.ObjectId().toHexString() })

  await ticket!.save()

  await request(app)
    .put(`/api/tickets/${response.body.ticket.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 100,
    })
    .expect(400)
})
