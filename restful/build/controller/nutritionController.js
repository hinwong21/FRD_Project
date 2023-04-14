"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionController = void 0;
const error_1 = require("../error");
require("../session");
class NutritionController {
    constructor(nutritionService) {
        this.nutritionService = nutritionService;
        this.getDailyIntake = async (req, res) => {
            try {
                const userId = req.session.userId;
                const date = new Date();
                const result = await this.nutritionService.getDailyIntake(userId, date);
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updateDailyIntake = async (req, res) => {
            try {
                const id = req.body.id;
                const userId = req.session.userId;
                const calories = req.body.calories;
                const carbs = req.body.carbs;
                const protein = req.body.protein;
                const fat = req.body.fat;
                const date = new Date();
                await this.nutritionService.updateDailyIntake(id, userId, calories, carbs, protein, fat, date);
                res.json({ success: true });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
    }
}
exports.NutritionController = NutritionController;
//# sourceMappingURL=nutritionController.js.map