import express from "express";
import { CurrentUserController } from "../controller/currentUserController";
import { CurrentUserService } from "../service/currentUserService";
import { knex } from "../db";

export let userRoutes = express.Router();

let currentUserService = new CurrentUserService(knex);
let currentUserController = new CurrentUserController(currentUserService);

userRoutes.get("/verifyToken", currentUserController.verifyToken);
userRoutes.post("/getToken", currentUserController.getToken);

userRoutes.get("/setting", currentUserController.getSetting);
userRoutes.post("/setting", currentUserController.updateSetting);
userRoutes.post("/username", currentUserController.updateUsername);
userRoutes.post("/weight", currentUserController.updateWeight);
userRoutes.post("/height", currentUserController.updateHeight);
userRoutes.post("/age", currentUserController.updateAge);
userRoutes.post("/gender", currentUserController.updateGender);

userRoutes.post("/fortune", currentUserController.updateFortune);

userRoutes.post("/:field", currentUserController.updateField);
