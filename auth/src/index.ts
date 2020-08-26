import express from 'express'
import 'express-async-errors'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { errorHandler } from './middleware/error-handler'
import { notFound } from './middleware/not-found'

const app = express()
app.use(express.json())

app.use(signupRouter)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(notFound)
app.use(errorHandler)

app.listen(3000, () => console.log('Auth Service running on port 3000'))
