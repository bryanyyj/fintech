import express from 'express';
const router = express.Router();

import { profile } from '../middlewares/profileMiddleware.js'
import { saveProfileToDB, updateProfileToDB, getProfileData } from '../controllers/profileController.js'

router.post('/', profile, saveProfileToDB);
router.put('/', profile, updateProfileToDB)

router.get('/', getProfileData)

export default router;