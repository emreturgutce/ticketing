import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'

let mongo: MongoMemoryServer

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
