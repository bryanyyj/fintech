import * as model from "../models/authModel.js";

//////////////////////////////////////////////////////
// EXAMPLE CONTROLLER FOR TOKEN PRE-GENERATION
//////////////////////////////////////////////////////
export const preTokenGenerate = (req, res, next) => {
    res.locals.userId = req.body.id;
    next();
}

//////////////////////////////////////////////////////
// EXAMPLE CONTROLLER FOR BEFORE SENDING TOKEN
//////////////////////////////////////////////////////
export const beforeSendToken = (req, res, next) => {
    res.locals.message = `Token is generated.`;
    next();
}

//////////////////////////////////////////////////////
// EXAMPLE CONTROLLER FOR TOKEN VERIFICATION
//////////////////////////////////////////////////////
export const showTokenVerified = (req, res, next) => {
    res.status(200).json({
        userId: res.locals.userId,
        message: "Token is verified."
    });
}

//////////////////////////////////////////////////////
// EXAMPLE CONTROLLER FOR BCRYPT COMPARE
//////////////////////////////////////////////////////
export const showCompareSuccess = (req, res, next) => {
    res.status(200).json({
        message: "Compare is successful."
    });
}

//////////////////////////////////////////////////////
// EXAMPLE CONTROLLER FOR BCRYPT PRE-COMPARE
//////////////////////////////////////////////////////
export const preCompare = (req, res, next) => {
    res.locals.hash = req.body.hash;
    next();
}

//////////////////////////////////////////////////////
// EXAMPLE CONTROLLER FOR BCRYPT HASHING
//////////////////////////////////////////////////////
export const showHashing = (req, res, next) => {
    res.status(200).json({
        hash: res.locals.hash,
        message: `Hash is successful.`
    });
}


//////////////////////////////////////////////////////
// REGISTER
//////////////////////////////////////////////////////

export const checkEmail = (req, res, next) =>
{
    const data = {
        email: req.body.email
    }

    if (req.body.email == undefined)
    {
        res.status(400).json({
            message: "Error: Email is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error:", error)
            res.status(500).json(error)
        }
        else if (results.length == 0){
            next()
        }
        else {
            res.status(409).json({
                message: "Provided Email is already associated with another user"
            });
            return;
        }
    }

    model.checkEmailExist(data, callback);
}

export const register = (req, res, next) =>
{
    const data = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: res.locals.hash
    }
    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        } else {
            next()
        }
    }
    model.insertSingle(data, callback);
}

//////////////////////////////////////////////////////
// LOGIN
//////////////////////////////////////////////////////

export const login = (req, res, next) =>
{
    const data = {
        email: req.body.email,
        password: res.locals.hash
    }

    if (req.body.password == undefined){
        return res.status(400).json({
            message: "Missing password."
        })
    }

    const callback = (error, results, fields) => {
        if (error){
            console.error("Error login:", error)
            res.status(500).json(error);
        }
        else {
            if (results.length == 0){
                return res.status(404).json({
                    message: "Email not registered"
                });
            }
            else {
                res.locals.hash = results[0].password
                res.locals.userId = results[0].user_id
                next();
            }
        }
    }
    model.selectEmail(data, callback);
}