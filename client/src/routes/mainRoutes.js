import express from 'express';
const router = express.Router();

// Import backend route handlers
import login from './login.js';
import register from './register.js';
import decision from './analyze_decision.js';
import profile from './save_profile.js';
import spend from './spending.js';

// Controllers and middleware
import { preTokenGenerate, beforeSendToken, showTokenVerified, preCompare, showCompareSuccess, showHashing } from '../controllers/exampleController.js';
import { generateToken, sendToken, verifyToken } from '../middlewares/jwtMiddleware.js';
import { hashPassword, comparePassword } from '../middlewares/bcryptMiddleware.js';


router.use("/login", login);
router.use("/register", register);
router.use("/analyze-decision", decision)
router.use("/profile", profile)
router.use("/", spend)

// JWT and bcrypt routes
router.post("/jwt/generate", preTokenGenerate, generateToken, beforeSendToken, sendToken);
router.get("/jwt/verify", verifyToken, showTokenVerified);
router.post("/bcrypt/compare", preCompare, comparePassword, showCompareSuccess);
router.post("/bcrypt/hash", hashPassword, showHashing);

export default router;
