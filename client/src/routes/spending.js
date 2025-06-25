import express from 'express';
const router = express.Router();

import { getSpendingData } from '../controllers/spendController.js'

router.get('/', getSpendingData);

export default router;