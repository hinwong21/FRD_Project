"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendarRoutes = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const calendarOauthController_1 = require("../controller/Calendar/GoogleCalendarOAuth/calendarOauthController");
const calendarOauthService_1 = require("../service/calendarOauthService");
const calendarController_1 = require("../controller/Calendar/calendarController");
const calendarService_1 = require("../service/calendarService");
exports.calendarRoutes = express_1.default.Router();
let calendarOauthService = new calendarOauthService_1.CalendarOauthService(db_1.knex);
let calendarOauthController = new calendarOauthController_1.CalendarOauthController(calendarOauthService);
let calendarService = new calendarService_1.CalendarService(db_1.knex);
let calendarController = new calendarController_1.CalendarController(calendarService);
exports.calendarRoutes.get("/google-calendar-authorization", calendarOauthController.calendarAuthorization);
exports.calendarRoutes.get("/google-events", calendarController.getGoogleCalendarEvent);
exports.calendarRoutes.get("/local-events", calendarController.getLocalCalendarEvent);
exports.calendarRoutes.post("/new-local-event", calendarController.createLocalCalendarEvent);
//# sourceMappingURL=calendarRoute.js.map