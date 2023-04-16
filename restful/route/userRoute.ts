import express from "express";
import { CurrentUserController } from "../controller/currentUserController";
import { isLoggedInAPI } from "../guard";
import { CurrentUserService } from "../service/currentUserService";
import { knex } from "../db";

export let userRoutes = express.Router();

let currentUserService = new CurrentUserService(knex);
let currentUserController = new CurrentUserController(currentUserService);

userRoutes.get("/verifyToken", currentUserController.verifyToken);

userRoutes.post("/getToken", currentUserController.getToken);
userRoutes.get("/user", isLoggedInAPI, currentUserController.getUser);
userRoutes.post("/data", isLoggedInAPI, currentUserController.updateData);
userRoutes.post(
  "/username",
  isLoggedInAPI,
  currentUserController.updateUsername
);
userRoutes.post("/weight", isLoggedInAPI, currentUserController.updateWeight);
userRoutes.post("/height", isLoggedInAPI, currentUserController.updateHeight);
userRoutes.post("/age", isLoggedInAPI, currentUserController.updateAge);
userRoutes.post("/gender", isLoggedInAPI, currentUserController.updateGender);
