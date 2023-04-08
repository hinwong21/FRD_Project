import express from "express";
import { knex } from "../database/db";
import { CalendarOauthController } from "../controller/Calendar/GoogleCalendarOAuth/calendarOauthController";
import { CalendarOauthService } from "../service/calendarOauthService";
import { CalendarController } from "../controller/Calendar/calendarController";
import { CalendarService } from "../service/calendarService";

export let calendarRoutes = express.Router();

let calendarOauthService = new CalendarOauthService(knex);
let calendarOauthController = new CalendarOauthController(calendarOauthService);

let calendarService = new CalendarService(knex);
let calendarController = new CalendarController(calendarService);

calendarRoutes.get(
  "/google-calendar-authorization",
  calendarOauthController.calendarAuthorization
);

calendarRoutes.get(
  "/google-events",
  calendarController.getGoogleCalendarEvent
);

calendarRoutes.get(
  "/local-events",
  calendarController.getLocalCalendarEvent
);

calendarRoutes.post(
  "/new-local-event",
  calendarController.createLocalCalendarEvent
);
