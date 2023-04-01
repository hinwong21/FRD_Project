import express from "express";
import { knex } from "../database/db";
import { AccountingService } from "../service/accountingService";
import { AccountingController } from "../controller/accountingController";

export let accountingRoutes = express.Router();

let accountingService = new AccountingService(knex);
let accountingController = new AccountingController(accountingService);

accountingRoutes.post("/addTransaction", accountingController.addTransaction);
accountingRoutes.get("/getTransaction", accountingController.getTransaction)
