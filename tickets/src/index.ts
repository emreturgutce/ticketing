import { app } from './app'
import mongoose from 'mongoose'
import { natsWrapper } from './nats-wrapper'

async function main() {
  try {
    await natsWrapper.connect('ticketing', 'asd', 'http://nats-srv:4222')

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!')

      process.exit()
    })

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())
  } catch (err) {
    console.log('An error occurred connecting nats client')
  }

  mongoose
    .connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(`Error occurred connecting MongoDB: ${err}`))

  app.listen(3000, () => console.log('Tickets Service running on port 3000'))
}

main()
