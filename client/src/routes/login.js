import express from 'express';
const router = express.Router();

// Controllers and middleware
import { login } from '../controllers/exampleController.js';
import { generateToken, sendToken } from '../middlewares/jwtMiddleware.js';
import { comparePassword } from '../middlewares/bcryptMiddleware.js';

router.post('/', login, comparePassword, generateToken, sendToken);

export default router;