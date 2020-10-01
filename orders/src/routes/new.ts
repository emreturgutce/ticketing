import { Router, Request, Response } from 'express'

const router = Router()

router.post('/api/orders', async (req: Request, res: Response) => {
  res.send({})
})

export { router as newOrderRouter }
