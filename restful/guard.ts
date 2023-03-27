import express from "express";
import { errorHandler } from "./error";
import "./session"


export const isLoggedInAPI = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    try {
        if (!req.session.isLogin) {
            throw new Error('No permission to access this API')
        }else{
            next()
            // console.log(req.route.path)
            
        }    
    } catch (err) {
        // res.json({
        //     data:null,
        //     isErr:true,
        //     errMess:err.message
        // })
        errorHandler(err,req,res)
    }
    
  };