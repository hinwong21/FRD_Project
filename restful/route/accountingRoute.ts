import express from "express";
import { isLoggedInAPI } from "../guard";
import { knex } from "../database/db";
import { CalendarOauthController } from "../controller/Calendar/GoogleCalendarOAuth/calendarOauthController";
import { CalendarOauthService } from "../service/calendarOauthService";

export let accountingRoutes = express.Router();

// let accountingService = new AccountingService(knex);
// let accountingController = new AccountingController(calendarOauthService);

// accountingRoutes.get("/Accounting", calendarOauthController.calendarAuthorization);
