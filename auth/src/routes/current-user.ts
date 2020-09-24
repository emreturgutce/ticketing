import { Router } from 'express'
import { currentUser } from '@et-ticketing/common'

const router = Router()

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.json({ data: { currentUser: req.currentUser } })
})

export { router as currentUserRouter }
