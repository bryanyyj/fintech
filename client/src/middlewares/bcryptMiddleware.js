//////////////////////////////////////////////////////
// REQUIRE BCRYPT MODULE
//////////////////////////////////////////////////////
// provides function to hash and compare passwords
import bcrypt from 'bcrypt'

//////////////////////////////////////////////////////
// SET SALT ROUNDS
//////////////////////////////////////////////////////
const saltRounds = 10;
// determines difficulty of password hashing algorithm
// higher the no. of rounds, time taken to hash is higher
// but improves security

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR COMPARING PASSWORD
//////////////////////////////////////////////////////
export const comparePassword = (req, res, next) => {
    // Check password
    const callback = (err, isMatch) => {
        if (err) {
        console.error("Error bcrypt:", err);
        res.status(500).json(err);
        } else {
        if (isMatch) {
            next();
        } else {
            res.status(401).json({
              message: "Wrong password",
            });
        }
        }
    };

    // compares password provided in req body w/ hashed password in res.locals.hash
    bcrypt.compare(req.body.password, res.locals.hash, callback);
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR HASHING PASSWORD
//////////////////////////////////////////////////////
export const hashPassword = (req, res, next) => {
    const callback = (err, hash) => {
        if (err) {
          console.error("Error bcrypt:", err);
          res.status(500).json(err);
        } else {
          res.locals.hash = hash;
          next();
        }
      };
    
      bcrypt.hash(req.body.password, saltRounds, callback);
};
