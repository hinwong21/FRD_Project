import express from "express";
import { knex } from "../database/db";
import { PeriodController } from "../controller/periodController";
import { PeriodService } from "../service/periodService";
import { isLoggedInAPI } from "../guard";

export const periodRoutes = express.Router();

const periodService = new PeriodService(knex);
const periodController = new PeriodController(periodService);

periodRoutes.get(
  "/upcomingDate",
  isLoggedInAPI,
  periodController.getUpcomingDate
);
periodRoutes.get("/periodStatus", isLoggedInAPI, periodController.getStatus);
periodRoutes.post(
  "/periodData",
  isLoggedInAPI,
  periodController.inputPeriodData
);
periodRoutes.put("/periodData", isLoggedInAPI, periodController.updatePeriod);
periodRoutes.post("/periodStatus", isLoggedInAPI, periodController.inputStatus);
periodRoutes.put("/periodStatus", isLoggedInAPI, periodController.updateStatus);
