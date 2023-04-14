"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const currentUserController_1 = require("../controller/currentUserController");
const guard_1 = require("../guard");
const currentUserService_1 = require("../service/currentUserService");
const db_1 = require("../database/db");
exports.userRoutes = express_1.default.Router();
let currentUserService = new currentUserService_1.CurrentUserService(db_1.knex);
let currentUserController = new currentUserController_1.CurrentUserController(currentUserService);
exports.userRoutes.get("/verifyToken", guard_1.isLoggedInAPI, currentUserController.verifyToken);
exports.userRoutes.post("/getToken", currentUserController.getToken);
exports.userRoutes.get("/user", guard_1.isLoggedInAPI, currentUserController.getUser);
exports.userRoutes.post("/data", guard_1.isLoggedInAPI, currentUserController.updateData);
exports.userRoutes.post("/username", guard_1.isLoggedInAPI, currentUserController.updateUsername);
exports.userRoutes.post("/weight", guard_1.isLoggedInAPI, currentUserController.updateWeight);
exports.userRoutes.post("/height", guard_1.isLoggedInAPI, currentUserController.updateHeight);
exports.userRoutes.post("/age", guard_1.isLoggedInAPI, currentUserController.updateAge);
exports.userRoutes.post("/gender", guard_1.isLoggedInAPI, currentUserController.updateGender);
//# sourceMappingURL=userRoute.js.map