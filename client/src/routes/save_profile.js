import express from 'express';
const router = express.Router();

import { saveProfileToDB } from '../controllers/profileController.js'

router.post('/', saveProfileToDB);

export default router;