import { app } from './app'
import mongoose from 'mongoose'
import { natsWrapper } from './nats-wrapper'
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener'
import { OrderCreatedListener } from './events/listeners/order-created-listener'

async function main() {
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error('NATS_CLUSTER_ID must be provided')
  if (!process.env.NATS_CLIENT_ID)
    throw new Error('NATS_CLIENT_ID must be provided')
  if (!process.env.NATS_URL) throw new Error('NATS_URL must be provided')
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be provided')

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    )

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!')

      process.exit()
    })

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())
  } catch (err) {
    console.error(err)
  }

  new OrderCreatedListener(natsWrapper.client).listen()
  new OrderCancelledListener(natsWrapper.client).listen()

  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err))

  app.listen(3000, () => console.log('Tickets Service running on port 3000'))
}

main()
