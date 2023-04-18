"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nutritionService = exports.nutritionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const nutritionController_1 = require("../controller/nutritionController");
const nutritionService_1 = require("../service/nutritionService");
const guard_1 = require("../guard");
exports.nutritionRoutes = express_1.default.Router();
exports.nutritionService = new nutritionService_1.NutritionService(db_1.knex);
let nutritionController = new nutritionController_1.NutritionController(exports.nutritionService);
exports.nutritionRoutes.get("/userData", guard_1.isLoggedInAPI, nutritionController.getDailyIntake);
exports.nutritionRoutes.put("/dailyIntake", guard_1.isLoggedInAPI, nutritionController.updateDailyIntake);
//# sourceMappingURL=nutritionRoute.js.map