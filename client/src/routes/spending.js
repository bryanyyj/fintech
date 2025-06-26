import express from 'express';
const router = express.Router();

import { getSpendingData, postBudget } from '../controllers/spendController.js'

router.get('/', getSpendingData);

router.post('/', postBudget)

export default router;