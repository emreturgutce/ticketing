import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
import request from 'supertest'

let mongo: MongoMemoryServer

declare global {
  namespace NodeJS {
    interface Global {
      signup(): Promise<string[]>
    }
  }
}

beforeAll(async () => {
  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()
  process.env.JWT_KEY =
    'ba25ecf355069f0aa3f20e8a4cbc5f4d706bd46adec52effd28d67a060fb8876'

  await mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  console.log('Connected to MongoDB')
})

beforeEach(async () => {
  jest.clearAllMocks()

  const collections = await mongoose.connection.db.collections()

  collections.forEach(async collection => await collection.deleteMany({}))
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signup = async () => {
  const email = 'test@test.com'
  const password = 'password'

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201)

  const cookie = response.get('Set-Cookie')

  return cookie
}
