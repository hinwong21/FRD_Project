import express from "express";
import { knex } from "../db";
import { AccountingService } from "../service/accountingService";
import { AccountingController } from "../controller/accountingController";

export let accountingRoutes = express.Router();

let accountingService = new AccountingService(knex);
let accountingController = new AccountingController(accountingService);

accountingRoutes.get("/budget", accountingController.getBudget);
accountingRoutes.post("/budget", accountingController.updateBudget);

accountingRoutes.post("/addTransaction", accountingController.addTransaction);
accountingRoutes.get("/getTransaction", accountingController.getTransaction);

accountingRoutes.get(
  "/getMonthlyTransaction",
  accountingController.getMonthlyTransaction
);
accountingRoutes.get(
  "/getDailyTransaction",
  accountingController.getDailyTransaction
);
