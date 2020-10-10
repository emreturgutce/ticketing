import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { errorHandler, notFound, currentUser } from '@et-ticketing/common'
import { createTicketRouter } from './routes/new'
import { showTicketRouter } from './routes/show'
import { updateTicketRouter } from './routes/update'
import { indexTicketRouter } from './routes/index'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({ signed: false, secure: false }))
app.use(currentUser)

app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)

app.use(notFound)
app.use(errorHandler)

export { app }
