"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarOauthService = void 0;
const uuid_1 = require("uuid");
class CalendarOauthService {
    constructor(knex) {
        this.knex = knex;
        this.calendarAuthorization = async (userId, content) => {
            await this.knex("google_calendar").insert({
                id: (0, uuid_1.v4)(),
                user_id: userId,
                content: JSON.stringify(content),
            });
        };
        this.knex = knex;
    }
}
exports.CalendarOauthService = CalendarOauthService;
//# sourceMappingURL=calendarOauthService.js.map