import express from "express";
import { errorHandler } from "./error";
import "./session"
import { verifyJwt } from "./jwt";


export const isLoggedInAPI = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];
            verifyJwt(token, req);
            next()
        } else {
            throw new Error("Not exist token in header")
        }

    } catch (err) {
        // res.json({
        //     data:null,
        //     isErr:true,
        //     errMess:err.message
        // })
        errorHandler(err, req, res)
    }

};