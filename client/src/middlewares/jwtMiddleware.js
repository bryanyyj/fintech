//////////////////////////////////////////////////////
// IMPORTS
//////////////////////////////////////////////////////
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config(); // Load environment variables
//////////////////////////////////////////////////////
// SET JWT CONFIGURATION
//////////////////////////////////////////////////////

const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR GENERATING JWT TOKEN
//////////////////////////////////////////////////////
export const generateToken = (req, res, next) => {
    const payload = {
        userId: res.locals.userId,
        timestamp: new Date()
    };

    const options = {
        algorithm: tokenAlgorithm,
        expiresIn: tokenDuration
    };

    const callback = (err, token) => {
        if (err) {
            console.error("Error jwt:", err);
            res.status(500).json(err);
        } else {
            res.locals.token = token;
            next();
        }
    };

    // jwt.sign method generates token
    const token = jwt.sign(payload, secretKey, options, callback);
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR SENDING JWT TOKEN
//////////////////////////////////////////////////////
export const sendToken = (req, res, next) => {
    res.status(200).json({
        userId: res.locals.userId,
        token: res.locals.token
    });
};

// this sendToken function sends JWT token in json response

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR VERIFYING JWT TOKEN
//////////////////////////////////////////////////////
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // removes bearer prefix in authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'No token provided'
        });
    }

    const token = authHeader.substring(7);

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    const callback = (err, decoded) => {
        if (err) {
        return res.status(401).json({ error: "Invalid token" });
        }

        res.locals.userId = decoded.userId;
        res.locals.tokenTimestamp = decoded.timestamp;
        
        next();
    };

    // verifies token with secret key and handle callback
    jwt.verify(token, secretKey, callback);
};
