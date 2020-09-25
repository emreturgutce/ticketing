import { app } from './app'
import mongoose from 'mongoose'

mongoose
  .connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(`Error occurred connecting MongoDB: ${err}`))

app.listen(3000, () => console.log('Auth Service running on port 3000'))
