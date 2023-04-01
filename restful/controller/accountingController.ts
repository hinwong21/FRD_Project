import { Request, Response } from "express";
import { AccountingService } from "../service/accountingService"
import { errorHandler } from "../error";

export class AccountingController {
    constructor(private accountingService: AccountingService) { }

    addTransaction = async (req: Request, res: Response) => {
        try {
            let { name, type, amount, description } = req.body;
            console.log(name, type, amount, description);
            this.accountingService.addTransaction(name, type, amount, description)
        } catch (error) {
            errorHandler(error, req, res)
        }
    }

    getTransaction = async (req: Request, res: Response) => {
        try {
            let { name, type, amount, description } = req.body;
            console.log(name, type, amount, description);
            this.accountingService.addTransaction(name, type, amount, description)
        } catch (error) {
            errorHandler(error, req, res)
        }

    }
}