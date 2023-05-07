import { Router } from 'express';
import passport from 'passport'
const router = Router();

router.post('/linked-roles', (req, res) => {
  console.log(req.body, res.body)
})

export default router;