import express from 'express';
const router = express.Router();

import { emailSender } from '../controllers/passwordController.js'

router.post('/', emailSender )
// router.put('/', updatePassword )

export default router;