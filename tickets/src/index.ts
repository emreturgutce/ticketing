import { app } from './app'
import mongoose from 'mongoose'
import { natsWrapper } from './nats-wrapper'
import { randomBytes } from 'crypto'

async function main() {
  await natsWrapper.connect(
    'ticketing',
    randomBytes(4).toString('hex'),
    'http://nats-srv:4222'
  )

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
