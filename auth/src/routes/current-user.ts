import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

router.get('/api/users/currentuser', (req, res) => {
  if (!req.session?.jwt) return res.json({ currentuser: null })

  if (!process.env.JWT_KEY) throw new Error('JWT_KEY not defined')

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY)

    res.status(200).json({ currentuser: payload })
  } catch (err) {
    res.json({ currentuser: null })
  }
})

export { router as currentUserRouter }
