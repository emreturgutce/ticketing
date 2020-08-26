import { Router } from 'express'

const router = Router()

router.post('/api/users/signin', (req, res) => {
  res.send('Hello World')
})

export { router as signinRouter }
