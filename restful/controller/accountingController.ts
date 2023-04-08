import { Request, Response } from "express";
import { AccountingService } from "../service/accountingService";
import { errorHandler } from "../error";

export class AccountingController {
  constructor(private accountingService: AccountingService) {}

  addTransaction = async (req: Request, res: Response) => {
    try {
      console.log("req.body", req.body);

      let { id, name, type, amount, description } = req.body;
      // console.log(name, type, amount, description);
      const addResult = await this.accountingService.addTransaction(
        id,
        name,
        type,
        amount,
        description
      );
      console.log(addResult);

      // res.json(addResult)
      res.json({ ok: true });
      return;
    } catch (error) {
      errorHandler(error, req, res);
    }
  };

  // getTransaction = async (req: Request, res: Response) => {
  //     try {
  //         const userId = '1'
  //         if (userId) {
  //             let { name, type, amount, description } = req.body;
  //             console.log(name, type, amount, description);
  //             this.accountingService.getTransaction(name, type, amount, description, userId)
  //         } else {
  //             return
  //         }

  //     } catch (error) {
  //         errorHandler(error, req, res)
  //     }

  // }

  getTransaction = async (req: Request, res: Response) => {
    try {
      // let userId = req.session.userId!
      let userId = req.body.userId;
      const tranResult = await this.accountingService.getTransaction(userId);
      // const tranResult = await this.accountingService.getTransaction(req.session.userId as number)
      res.json(tranResult);
      // return
    } catch (error) {
      errorHandler(error, req, res);
    }
  };
}
