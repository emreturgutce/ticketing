import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { errorHandler, notFound, currentUser } from '@et-ticketing/common'
import { createChargeRouter } from './routes/new'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({ signed: false, secure: false }))
app.use(currentUser)

app.use(createChargeRouter)

app.use(notFound)
app.use(errorHandler)

export { app }
