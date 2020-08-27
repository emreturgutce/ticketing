import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { errorHandler } from './middleware/error-handler'
import { notFound } from './middleware/not-found'

mongoose
  .connect('mongodb://auth-mongo-srv:27017/auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(`Error occurred connecting MongoDB: ${err}`))

const app = express()
app.use(express.json())

app.use(signupRouter)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(notFound)
app.use(errorHandler)

app.listen(3000, () => console.log('Auth Service running on port 3000'))
