"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingService = void 0;
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
        this.updateBudget = async (id, userId, budget) => {
            try {
                await this.knex("finance").insert({
                    id,
                    budget,
                    user_id: userId,
                });
            }
            catch (error) {
                throw new Error(`Error occurred while getting Daily transaction in accountingService: ${error.message}`);
            }
        };
        this.getBudget = async (userId) => {
            try {
                let budget = await this.knex("finance")
                    .select("*")
                    .where("user_id", userId);
                return budget;
            }
            catch (error) {
                throw new Error(`Error occurred while getting Daily transaction in accountingService: ${error.message}`);
            }
        };
    }
}
exports.AccountingService = AccountingService;
//# sourceMappingURL=accountingService.js.map