"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarController = void 0;
const error_1 = require("../../error");
const jwt_1 = require("../../jwt");
class CalendarController {
    constructor(calendarService) {
        this.calendarService = calendarService;
        this.getGoogleCalendarEvent = async (req, res) => {
            try {
                let data = await this.calendarService.getGoogleCalendarEvent((0, jwt_1.getJWT)(req).userId);
                res.json(data);
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.getLocalCalendarEvent = async (req, res) => {
            try {
                let userId = (0, jwt_1.getJWT)(req).userId;
                let data = await this.calendarService.getLocalCalendarEvent(userId);
                res.json(data);
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.createLocalCalendarEvent = async (req, res) => {
            try {
                let eventData = req.body;
                console.log(eventData);
                await this.calendarService.createLocalCalendarEvent(eventData, (0, jwt_1.getJWT)(req).userId);
                res.json({ success: true });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.calendarService = calendarService;
    }
}
exports.CalendarController = CalendarController;
//# sourceMappingURL=calendarController.js.map