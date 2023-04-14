"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionService = void 0;
class NutritionService {
    constructor(knex) {
        this.knex = knex;
        this.getDailyIntake = async (userId, date) => {
            try {
                let user = await this.knex("users").select("*").where("id", userId);
                let nutrient = await this.knex("nutrition")
                    .select("*")
                    .where({ user_id: userId, date: date });
                return {
                    user,
                    nutrient,
                };
            }
            catch (err) {
                throw new Error(err.message);
            }
        };
        this.updateDailyIntake = async (id, userId, calories, carbs, protein, fat, date) => {
            try {
                const checkIntake = await this.knex("nutrition")
                    .where({ user_id: userId })
                    .andWhere({ date: date })
                    .select();
                if (checkIntake.length > 0) {
                    await this.knex("nutrition")
                        .where({ user_id: userId, date: date })
                        .update({
                        calories: this.knex.raw(`calories + ${calories}`),
                        carbs: this.knex.raw(`carbs + ${carbs}`),
                        protein: this.knex.raw(`protein + ${protein}`),
                        fat: this.knex.raw(`fat + ${fat}`),
                    });
                }
                else {
                    await this.knex("nutrition").insert({
                        id: id,
                        user_id: userId,
                        calories: calories,
                        carbs: carbs,
                        protein: protein,
                        fat: fat,
                        date: date,
                    });
                }
            }
            catch (err) {
                throw new Error(err.message);
            }
        };
        this.getAllFirebasePushNotificationTokens = async () => {
            let tokens = await this.knex();
            return tokens;
        };
    }
}
exports.NutritionService = NutritionService;
//# sourceMappingURL=nutritionService.js.map