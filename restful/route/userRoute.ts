import express from "express";
import { CurrentUserController } from "../controller/currentUserController";
import { isLoggedInAPI } from "../guard";
import { CurrentUserService } from "../service/currentUserService";
import { knex } from "../database/db";

export let userRoutes = express.Router();

let currentUserService = new CurrentUserService(knex);
let currentUserController = new CurrentUserController(currentUserService);

userRoutes.get(
  "/verifyToken",
  isLoggedInAPI,
  currentUserController.verifyToken
);

userRoutes.post("/getToken", currentUserController.getToken);
userRoutes.get("/user", isLoggedInAPI, currentUserController.getUser);
userRoutes.post("/data", isLoggedInAPI, currentUserController.updateData);
