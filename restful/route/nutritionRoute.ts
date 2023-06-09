import express from "express";
import { knex } from "../db";
import { NutritionController } from "../controller/nutritionController";
import { NutritionService } from "../service/nutritionService";
import { isLoggedInAPI } from "../guard";

export let nutritionRoutes = express.Router();

export let nutritionService = new NutritionService(knex);
let nutritionController = new NutritionController(nutritionService);

nutritionRoutes.get(
  "/userData",
  isLoggedInAPI,
  nutritionController.getDailyIntake
);
nutritionRoutes.put(
  "/dailyIntake",
  isLoggedInAPI,
  nutritionController.updateDailyIntake
);
