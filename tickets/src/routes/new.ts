import { Router, Request, Response } from 'express'
import { requireAuth } from '@et-ticketing/common'

const router = Router()

router.post('/api/tickets', requireAuth, (req: Request, res: Response) => {})

export { router as createTicketRouter }