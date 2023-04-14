import { Request, Response } from "express";
import { AccountingService } from "../service/accountingService";
import { errorHandler } from "../error";

export class AccountingController {
  constructor(private accountingService: AccountingService) {}

  addTransaction = async (req: Request, res: Response) => {
    try {
      let userId = req.session.userId!;
      let { name, type, amount, description } = req.body;
      console.log(name, type, amount, description, userId);
      const addResult = await this.accountingService.addTransaction(
        // id,
        name,
        type,
        amount,
        description,
        userId
      );
      console.log("accountingController.ts", addResult);

      res.json(addResult);
      // res.json({ ok: true });

      // return;
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
      let userId = req.session.userId;
      console.log(userId);

      const tranResult = await this.accountingService.getTransaction(userId!);
      // const tranResult = await this.accountingService.getTransaction(req.session.userId as number)
      console.log(tranResult);
      res.json(tranResult);

      return;
    } catch (error) {
      errorHandler(error, req, res);
    }
  };
}
