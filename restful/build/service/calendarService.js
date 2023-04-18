"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarService = void 0;
class CalendarService {
    constructor(knex) {
        this.knex = knex;
        this.getGoogleCalendarEvent = async (userId) => {
            let data = await this.knex("google_calendar")
                .select("*")
                .where("user_id", userId);
            console.log(data);
            return data;
        };
        this.getLocalCalendarEvent = async (userId) => {
            let row = await this.knex("calendar")
                .select("content")
                .where("user_id", userId)
                .first();
            if (row?.content) {
                return JSON.parse(row.content);
            }
            return [];
        };
        this.createLocalCalendarEvent = async (eventData, userId) => {
            await this.knex
                .insert({
                id: eventData.id,
                title: eventData.title,
                description: eventData.description,
                start: eventData.start,
                end: eventData.end,
                backgroundColor: eventData.backgroundColor,
                user_id: userId,
            })
                .into("calendar");
        };
        this.knex = knex;
    }
}
exports.CalendarService = CalendarService;
//# sourceMappingURL=calendarService.js.map