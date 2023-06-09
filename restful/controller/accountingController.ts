import { Request, Response } from "express";
import { AccountingService } from "../service/accountingService";
import { errorHandler } from "../error";
import { getJWT } from "../jwt";
import "../session";

export class AccountingController {
  constructor(private accountingService: AccountingService) {}

  addTransaction = async (req: Request, res: Response) => {
    try {
      let userId = getJWT(req).userId!;
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
      throw new Error(
        `Error occurred while adding transaction in accountingController : ${error.message}`
      );
    }
  };

  getTransaction = async (req: Request, res: Response) => {
    try {
      let userId = getJWT(req).userId;

      const tranResult = await this.accountingService.getTransaction(userId!);
      // const tranResult = await this.accountingService.getTransaction(req.session.userId as number)
      res.json(tranResult);

      return;
    } catch (error) {
      errorHandler(error, req, res);
    }
  };

  getMonthlyTransaction = async (req: Request, res: Response) => {
    try {
      let userId = getJWT(req).userId;
      console.log(userId);

      const getResult = await this.accountingService.getMonthlyTransaction(
        userId!
      );
      // const tranResult = await this.accountingService.getTransaction(req.session.userId as number)
      console.log("accountingController : ", getResult);
      res.json(getResult);

      return;
    } catch (error) {
      errorHandler(error, req, res);
    }
  };

  getDailyTransaction = async (req: Request, res: Response) => {
    try {
      let userId = getJWT(req).userId;

      console.log(userId);

      const getDailyResult = await this.accountingService.getDailyTransaction(
        userId!
      );

      console.log("accountingController : ", getDailyResult);
      res.json(getDailyResult);

      return;
    } catch (error) {
      errorHandler(error, req, res);
    }
  };

  updateBudget = async (req: Request, res: Response) => {
    try {
      let user_id = getJWT(req).userId;
      let budget = req.body.budget;
      await this.accountingService.updateBudget({ user_id, budget });
      res.json({});
    } catch (error) {
      errorHandler(error, req, res);
    }
  };

  getBudget = async (req: Request, res: Response) => {
    try {
      let userId = getJWT(req).userId;
      const budget = await this.accountingService.getBudget(userId);
      res.json({ budget });
    } catch (error) {
      errorHandler(error, req, res);
    }
  };
}
