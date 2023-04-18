"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const currentUserController_1 = require("../controller/currentUserController");
const currentUserService_1 = require("../service/currentUserService");
const db_1 = require("../db");
exports.userRoutes = express_1.default.Router();
let currentUserService = new currentUserService_1.CurrentUserService(db_1.knex);
let currentUserController = new currentUserController_1.CurrentUserController(currentUserService);
exports.userRoutes.get("/verifyToken", currentUserController.verifyToken);
exports.userRoutes.post("/getToken", currentUserController.getToken);
exports.userRoutes.get("/user", currentUserController.getUser);
exports.userRoutes.post("/data", currentUserController.updateData);
exports.userRoutes.post("/username", currentUserController.updateUsername);
exports.userRoutes.post("/weight", currentUserController.updateWeight);
exports.userRoutes.post("/height", currentUserController.updateHeight);
exports.userRoutes.post("/age", currentUserController.updateAge);
exports.userRoutes.post("/gender", currentUserController.updateGender);
exports.userRoutes.post("/:field", currentUserController.updateField);
//# sourceMappingURL=userRoute.js.map