import express from 'express';
const router = express.Router();

import { updatePassword } from '../controllers/settingController.js'

router.put('/password', updatePassword )

export default router;