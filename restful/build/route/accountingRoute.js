"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const accountingService_1 = require("../service/accountingService");
const accountingController_1 = require("../controller/accountingController");
exports.accountingRoutes = express_1.default.Router();
let accountingService = new accountingService_1.AccountingService(db_1.knex);
let accountingController = new accountingController_1.AccountingController(accountingService);
exports.accountingRoutes.get("/budget", accountingController.getBudget);
exports.accountingRoutes.post("/budget", accountingController.updateBudget);
exports.accountingRoutes.post("/addTransaction", accountingController.addTransaction);
exports.accountingRoutes.get("/getTransaction", accountingController.getTransaction);
exports.accountingRoutes.get("/getMonthlyTransaction", accountingController.getMonthlyTransaction);
exports.accountingRoutes.get("/getDailyTransaction", accountingController.getDailyTransaction);
//# sourceMappingURL=accountingRoute.js.map