import { Request, Response } from "express";
import { AccountingService } from "../service/accountingService";
import { errorHandler } from "../error";

export class AccountingController {
<<<<<<< HEAD
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
=======
  constructor(private accountingService: AccountingService) { }

  addTransaction = async (req: Request, res: Response) => {
    try {
      let userId = req.session.userId!
      let { name, type, amount, description } = req.body;
      console.log(name, type, amount, description, userId);
      const addResult = await this.accountingService.addTransaction(
        // id,
        name,
        type,
        amount,
        description,
        userId,
      );
      console.log('accountingController.ts', addResult);

      res.json(addResult)
      // res.json({ ok: true });

      // return;
>>>>>>> f3113e1137665f03642942135dc633437808749a
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
<<<<<<< HEAD
      // console.log()
      const tranResult = await this.accountingService.getTransaction("1");
=======
      let userId = req.session.userId;
      console.log(userId);

      const tranResult = await this.accountingService.getTransaction(userId!);
>>>>>>> f3113e1137665f03642942135dc633437808749a
      // const tranResult = await this.accountingService.getTransaction(req.session.userId as number)
      console.log(tranResult);
      res.json(tranResult);

<<<<<<< HEAD
      // return
=======

      return
>>>>>>> f3113e1137665f03642942135dc633437808749a
    } catch (error) {
      errorHandler(error, req, res);
    }
  };
}
