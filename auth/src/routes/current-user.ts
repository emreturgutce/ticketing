import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { currentUser } from '../middleware/current-user'

const router = Router()

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.json({ data: { currentUser: req.currentUser } })
})

export { router as currentUserRouter }
