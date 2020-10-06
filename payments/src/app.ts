import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { errorHandler, notFound, currentUser } from '@et-ticketing/common'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' })
)
app.use(currentUser)

app.use(notFound)
app.use(errorHandler)

export { app }
