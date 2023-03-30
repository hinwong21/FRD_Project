import { Request, Response } from "express";
import { errorHandler } from "../error";
import "../session";

export class CurrentUserController {
    constructor(){}

    currentUser=async (req:Request, res:Response)=>{
        try{
             let userId = req.session.userId
        res.json(userId)
        }catch(err){
            errorHandler(err, req, res);
        }
    }
}