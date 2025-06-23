import express from 'express';
const router = express.Router();

import { analyzeDecision } from '../controllers/decisionController.js';

router.post('/', analyzeDecision);

export default router;
