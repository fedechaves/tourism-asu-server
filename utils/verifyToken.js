import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    let token;
    const headers = req.headers.authorization;

    if (headers && headers.startsWith("Bearer")) {
      token = headers.split(" ")[1];
    } else if (req.cookies.access_token) {
      token = req.cookies.access_token;
    }
    
    
    if(!token) {
        return next(createError(401, "You're not authenticated!"))
    }

    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if(err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next()
    })
}


export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next,  () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }else {
            if(err) return next(createError(403, "You are not authorized!"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin) {
            next()
        }else {
            if(err) return next(createError(403, "You are not authorized!"))
        }
    })
}