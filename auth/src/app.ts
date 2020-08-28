import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
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
app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({ signed: false, secure: true }))

app.use(signupRouter)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(notFound)
app.use(errorHandler)

export { app }
