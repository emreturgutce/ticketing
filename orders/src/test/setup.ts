import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

let mongo: MongoMemoryServer

declare global {
  namespace NodeJS {
    interface Global {
      signup(): string[]
    }
  }
}

jest.mock('../../nats-wrapper')

beforeAll(async () => {
  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()
  process.env.JWT_KEY =
    'ba25ecf355069f0aa3f20e8a4cbc5f4d706bd46adec52effd28d67a060fb8876'

  mongoose
    .connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(`Error occurred connecting MongoDB: ${err}`))
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  collections.forEach(async collection => await collection.deleteMany({}))
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signup = () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!)

  const session = { jwt: token }

  const sessionJSON = JSON.stringify(session)

  const base64 = Buffer.from(sessionJSON).toString('base64')

  return [`express:sess=${base64}`]
}
