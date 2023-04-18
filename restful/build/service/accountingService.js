"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingService = void 0;
const uuid_1 = require("uuid");
class AccountingService {
    constructor(knex) {
        this.knex = knex;
        this.addTransaction = async (
        // id: number,
        name, type, amount, description, userId) => {
            try {
                let addTransaction = await this.knex("transaction")
                    .insert([
                    {
                        // id: id,
                        category: name,
                        type: type,
                        amount: amount,
                        description: description,
                        user_id: userId,
                    },
                ])
                    .returning("*");
                console.log("accountingService.ts", addTransaction);
                return addTransaction;
            }
            catch (error) {
                throw new Error(`Error occurred while adding transaction in accountingService: ${error.message}`);
            }
        };
        // getTransaction = async (userId: number, name: string, type: string, amount: number, description?: string) => {
        //     try {
        //         const transactionResule =
        //             await this.knex("transaction")
        //                 .select("*")
        //                 .where("user_id", userId)
        //         return transactionResule
        //     } catch (error) {
        //         console.error('Error occurred while getting', error);
        //     }
        // }
        this.getTransaction = async (userId) => {
            try {
                let getTransaction = await this.knex("transaction")
                    .select("*")
                    // .where({ user_id: userId });
                    .where("user_id", userId);
                console.log(getTransaction);
                return getTransaction;
            }
            catch (error) {
                throw new Error(`Error occurred while getting transaction in accountingService: ${error.message}`);
            }
        };
        this.getMonthlyTransaction = async (userId) => {
            try {
                let getMonthlyTransaction = await this.knex("transaction")
                    .select("*")
                    .where("user_id", userId)
                    .whereRaw(`date_trunc('month', created_at) = date_trunc('month', current_date)`)
                    .whereRaw(`created_at::date <= current_date::date`);
                console.log("accountingService : ", getMonthlyTransaction);
                return getMonthlyTransaction;
            }
            catch (error) {
                throw new Error(`Error occurred while getting Monthly transaction in accountingService: ${error.message}`);
            }
        };
        this.getDailyTransaction = async (userId) => {
            try {
                let getDailyTransaction = await this.knex("transaction")
                    .where("user_id", userId)
                    .whereRaw("created_at::date = current_date");
                console.log("accountingService : ", getDailyTransaction);
                return getDailyTransaction;
            }
            catch (error) {
                throw new Error(`Error occurred while getting Daily transaction in accountingService: ${error.message}`);
            }
        };
        this.updateBudget = async (input) => {
            await this.knex.transaction(async (knex) => {
                let row = await knex("finance")
                    .select("id")
                    .where({ user_id: input.user_id })
                    .first();
                if (row) {
                    await knex("finance")
                        .where({ id: row.id })
                        .update({ budget: input.budget });
                }
                else {
                    await knex("finance").insert({
                        id: (0, uuid_1.v4)(),
                        user_id: input.user_id,
                        budget: input.budget,
                    });
                }
            });
        };
        this.getBudget = async (userId) => {
            try {
                let row = await this.knex("finance")
                    .select("budget")
                    .where("user_id", userId)
                    .first();
                return row?.budget;
            }
            catch (error) {
                throw new Error(`Error occurred while getting Daily transaction in accountingService: ${error.message}`);
            }
        };
    }
}
exports.AccountingService = AccountingService;
//# sourceMappingURL=accountingService.js.map