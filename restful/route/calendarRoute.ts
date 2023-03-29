import express from "express";
import { isLoggedInAPI } from "../guard";
import { knex } from "../../database/db";
import {CalendarOauthController} from "../controller/Calendar/Google Calendar OAuth/calendarOauthController"
import { CalendarOauthService } from "../service/calendarOauthService";
import "../../session";

export let calendarRoutes = express.Router();

let calendarOauthService = new CalendarOauthService(knex);
let calendarOauthController = new CalendarOauthController(calendarOauthService);

calendarRoutes.get("/google-events", calendarOauthController.calendarAuthorization);