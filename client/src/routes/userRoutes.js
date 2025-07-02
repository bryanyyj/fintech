import express from 'express';
const router = express.Router();

import { getUserById } from '../controllers/userController.js'

router.get('/', getUserById)

export default router;