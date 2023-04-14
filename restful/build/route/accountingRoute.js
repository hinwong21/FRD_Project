"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../database/db");
const accountingService_1 = require("../service/accountingService");
const accountingController_1 = require("../controller/accountingController");
const guard_1 = require("../guard");
exports.accountingRoutes = express_1.default.Router();
let accountingService = new accountingService_1.AccountingService(db_1.knex);
let accountingController = new accountingController_1.AccountingController(accountingService);
exports.accountingRoutes.get("/getDailyTransaction", guard_1.isLoggedInAPI, accountingController.getDailyTransaction);
exports.accountingRoutes.get("/budget", guard_1.isLoggedInAPI, accountingController.getBudget);
exports.accountingRoutes.post("/budget", guard_1.isLoggedInAPI, accountingController.updateBudget);
exports.accountingRoutes.post("/addTransaction", guard_1.isLoggedInAPI, accountingController.addTransaction);
exports.accountingRoutes.get("/getTransaction", guard_1.isLoggedInAPI, accountingController.getTransaction);
exports.accountingRoutes.get("/getMonthlyTransaction", guard_1.isLoggedInAPI, accountingController.getMonthlyTransaction);
exports.accountingRoutes.get("/getDailyTransaction", guard_1.isLoggedInAPI, accountingController.getDailyTransaction);
//# sourceMappingURL=accountingRoute.js.map