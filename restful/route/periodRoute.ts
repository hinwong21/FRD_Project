import express from "express";
import { knex } from "../db";
import { PeriodController } from "../controller/periodController";
import { PeriodService } from "../service/periodService";

export const periodRoutes = express.Router();

const periodService = new PeriodService(knex);
const periodController = new PeriodController(periodService);

periodRoutes.get("/upcomingDate", periodController.getUpcomingDate);
periodRoutes.get("/periodStatus", periodController.getStatus);
periodRoutes.get("/period_calendar", periodController.getPeriodTableCalendar);
periodRoutes.post("/periodData", periodController.inputPeriodData);
periodRoutes.put("/periodData", periodController.updatePeriod);
periodRoutes.post("/periodStatus", periodController.inputStatus);
periodRoutes.put("/periodStatus", periodController.updateStatus);
// periodRoutes.get("/period/:id/status");
