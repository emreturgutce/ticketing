import { requireAuth, validateRequest } from '@et-ticketing/common'
import { Request, Response, Router } from 'express'
import { body } from 'express-validator'

const router = Router()

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  (req: Request, res: Response) => {
    res.json({ success: true })
  }
)

export { router as createChargeRouter }
