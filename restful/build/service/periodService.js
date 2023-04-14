"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodService = void 0;
const uuid_1 = require("uuid");
class PeriodService {
    constructor(knex) {
        this.knex = knex;
        this.getUpcomingAt = async (userId) => {
            try {
                const upcomingDate = await this.knex("period")
                    .select("upcoming_at")
                    .where("user_id", userId);
                console.log("upcomingDate::", upcomingDate);
                return {
                    success: true,
                    upcomingDate,
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        //This is the first time to input data
        this.inputAllPeriodData = async (id, userId, start_at, end_at, upcoming_at, days, ovu_start_at, ovu_end_at) => {
            try {
                console.log(id);
                console.log(upcoming_at);
                console.log(userId);
                await this.knex("period").insert({
                    //TODO 要在frontend 先gen個id先
                    id: id,
                    user_id: userId,
                    start_at,
                    end_at,
                    upcoming_at,
                    days: days,
                    ovu_start_at,
                    ovu_end_at,
                });
                return {
                    success: true,
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        //This is for update the period data
        this.updatePeriodData = async (id, start_at, end_at, upcoming_at, days, ovu_start_at, ovu_end_at) => {
            try {
                console.log("id", id);
                console.log("start_at", start_at);
                console.log("end_at", end_at);
                console.log("upcoming_at", upcoming_at);
                console.log("days", days);
                console.log("ovu_start_at", ovu_start_at);
                console.log("ovu_end_at", ovu_end_at);
                if (start_at) {
                    await this.knex("period").where({ id }).update({ start_at });
                    console.log("1");
                }
                else if (end_at) {
                    await this.knex("period").where({ id }).update({ end_at });
                    console.log("2");
                }
                else if (upcoming_at) {
                    await this.knex("period").where({ id }).update({ upcoming_at });
                    console.log("2");
                }
                else if (days) {
                    await this.knex("period").where({ id }).update({ days });
                    console.log("3");
                }
                else if (ovu_start_at) {
                    await this.knex("period").where({ id }).update({ ovu_start_at });
                    console.log("4");
                }
                else if (ovu_end_at) {
                    await this.knex("period").where({ id }).update({ ovu_end_at });
                    console.log("5");
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        //For the first time to insert period status
        this.inputPeriodStatus = async (statusId, //TODO frontend gen
        periodId, //TODO frontend gen
        type, content) => {
            try {
                console.log("Input STS run");
                console.log("sts id:", statusId);
                console.log("per id:", periodId);
                console.log("type:", type);
                console.log("content:", content);
                // TODO DB refresh insert 到但係大眼仔 係false,而且要hard code，大眼仔入唔得
                //Insert into period_status table
                await this.knex("period_status").insert({
                    id: statusId,
                    type,
                    content,
                });
                console.log("Input STS run 1");
                // TODO Insert 唔到
                //Insert into period_period_status table
                await this.knex("period_period_status").insert({
                    id: (0, uuid_1.v4)(),
                    period_id: periodId,
                    period_status_id: statusId,
                });
                console.log("Input STS run 2");
                return {
                    success: true,
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        //For update the period status
        //TODO 大眼仔error，但controller hard code先得，但唔識update update_at
        this.updatePeriodStatus = async (statusId, type, content) => {
            try {
                console.log("updatePeriodStatus");
                console.log("statusId", statusId);
                console.log("type", type);
                console.log("content", content);
                await this.knex("period_status")
                    .where({ id: statusId })
                    .update({ type, content });
                return {
                    success: true,
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        //For get the period status data
        this.getPeriodStatus = async (periodId) => {
            try {
                const periodStatus = await this.knex("period_period_status")
                    .select("type", "content")
                    // .select("*")
                    .innerJoin("period", "period_period_status.period_id", "period.id")
                    .innerJoin("period_status", "period_period_status.period_status_id", "period_status.id")
                    .where("period_period_status.period_id", periodId);
                console.log("periodStatus:", periodStatus);
                return {
                    success: true,
                    periodStatus,
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
    }
}
exports.PeriodService = PeriodService;
//# sourceMappingURL=periodService.js.map