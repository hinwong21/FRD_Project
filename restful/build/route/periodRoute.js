"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.periodRoutes = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const periodController_1 = require("../controller/periodController");
const periodService_1 = require("../service/periodService");
exports.periodRoutes = express_1.default.Router();
const periodService = new periodService_1.PeriodService(db_1.knex);
const periodController = new periodController_1.PeriodController(periodService);
exports.periodRoutes.get("/upcomingDate", periodController.getUpcomingDate);
exports.periodRoutes.get("/periodStatus", periodController.getStatus);
exports.periodRoutes.post("/periodData", periodController.inputPeriodData);
exports.periodRoutes.put("/periodData", periodController.updatePeriod);
exports.periodRoutes.post("/periodStatus", periodController.inputStatus);
exports.periodRoutes.put("/periodStatus", periodController.updateStatus);
// periodRoutes.get("/period/:id/status");
//# sourceMappingURL=periodRoute.js.map