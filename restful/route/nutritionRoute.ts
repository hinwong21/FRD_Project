import express from "express";
import { knex } from "../database/db";
import { NutritionController } from "../controller/nutritionController";
import { NutritionService } from "../service/nutritionService";

export let nutritionRoutes = express.Router();

let nutritionService = new NutritionService(knex);
let nutritionController = new NutritionController(nutritionService);

nutritionRoutes.get("/userData", nutritionController.getDailyIntake);
nutritionRoutes.put("/dailyIntake", nutritionController.updateDailyIntake);
