import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
  })

  await ticket.save()

  return ticket
}

it('fetches orders for a particular user', async () => {
  const ticketOne = await buildTicket()
  const ticketTwo = await buildTicket()
  const ticketThree = await buildTicket()

  const userOne = global.signup()
  const userTwo = global.signup()

  await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201)

  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201)

  const { body: orderTwo } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201)

  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', userTwo)
    .expect(200)

  // Making sure we got right amount of orders and the orders for userTwo
  expect(response.body.orders.length).toEqual(2)
  expect(response.body.orders[0].id).toEqual(orderOne.order.id)
  expect(response.body.orders[1].id).toEqual(orderTwo.order.id)
  expect(response.body.orders[0].ticket.id).toEqual(ticketTwo.id)
})
