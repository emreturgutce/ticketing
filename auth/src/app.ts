import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { errorHandler } from './middleware/error-handler'
import { notFound } from './middleware/not-found'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' })
)

app.use(signupRouter)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(notFound)
app.use(errorHandler)

export { app }
