import express from 'express';
const router = express.Router();

// Controllers and middleware
import { checkEmail, register } from '../controllers/exampleController.js';
import { generateToken, sendToken } from '../middlewares/jwtMiddleware.js';
import { hashPassword } from '../middlewares/bcryptMiddleware.js';

router.post('/', checkEmail, hashPassword, register, generateToken, sendToken
);

export default router;