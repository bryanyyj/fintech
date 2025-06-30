import express from 'express';
const router = express.Router();

import { postBudget, getTransactionData, postTransaction, getFinancialWellness, setFinancialWellness, getFinancialWellnessById } from '../controllers/spendController.js'

router.get('/transactions', getTransactionData)

router.post('/budget', postBudget)
router.post('/transactions', postTransaction)

router.get('/financial-wellness', getFinancialWellness);
router.post('/financial-wellness', setFinancialWellness);
router.get('/financial-wellness/:userId', getFinancialWellnessById);

export default router;