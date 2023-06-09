"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodService = void 0;
class PeriodService {
    constructor(knex) {
        this.knex = knex;
        // getUpcomingAt = async (userId: string) => {
        //   try {
        //     const upcomingDate = await this.knex("period")
        //       .select("upcoming_at")
        //       .where("user_id", userId);
        //     console.log("upcomingDate::", upcomingDate);
        //     return {
        //       success: true,
        //       upcomingDate,
        //     };
        //   } catch (error) {
        //     throw new Error((error as Error).message);
        //   }
        // };
        this.getUpcomingAt = async (userId) => {
            try {
                const upcomingDate = await this.knex("period")
                    .select("*")
                    .where("user_id", userId)
                    .orderBy("updated_at", "asc");
                console.log("All Period data::", upcomingDate);
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
        this.updatePeriodData = async (input) => {
            await this.checkPeriodUser(input);
            await this.knex("period")
                .where({ id: input.period_id })
                .update(input.fields);
        };
        //For the first time to insert period status
        this.inputPeriodStatus = async (input) => {
            await this.checkPeriodUser(input);
            await this.knex("period_status").insert({
                id: input.status_id,
                period_id: input.period_id,
                type: input.type,
                content: input.content,
            });
        };
        //For update the period status
        //TODO 大眼仔error，但controller hard code先得，但唔識update update_at
        this.updatePeriodStatus = async (input) => {
            let period_status = await this.knex("period_status")
                .select("period_id")
                .where("id", input.status_id)
                .first();
            await this.checkPeriodUser({
                period_id: period_status?.period_id,
                user_id: input.user_id,
            });
            await this.knex("period_status")
                .where({ id: input.status_id })
                .update({ type: input.type, content: input.content });
        };
        //For get the period status data
        this.getPeriodStatus = async (input) => {
            await this.checkPeriodUser(input);
            let periodStatus = await this.knex
                .from("period_status")
                .select("period_status.type", "period_status.content")
                .where("period_status.period_id", input.period_id);
            return {
                success: true,
                periodStatus,
            };
        };
    }
    async checkPeriodUser(input) {
        let period = await this.knex
            .select("user_id")
            .from("period")
            .where("id", input.period_id)
            .first();
        if (!period)
            throw new Error("period not found");
        if (period !== input.user_id)
            throw new Error("the period is not yours");
    }
}
exports.PeriodService = PeriodService;
//# sourceMappingURL=periodService.js.map