import express from 'express';
const router = express.Router();

import { postBudget, getTransactionData, postTransaction } from '../controllers/spendController.js'

router.get('/transactions', getTransactionData)

router.post('/budget', postBudget)
router.post('/transactions', postTransaction)

export default router;