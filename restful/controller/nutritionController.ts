import { Request, Response } from "express";
import { NutritionService } from "../service/nutritionService";
import { errorHandler } from "../error";

export class NutritionController {
  constructor(private nutritionService: NutritionService) {}

  getDailyIntake = async (req: Request, res: Response) => {
    try {
      //   const userId = req.session.userId!;
      const userId = 1;
      const id = 2;
      const result = await this.nutritionService.getDailyIntake(userId, id);

      res.json({ result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateDailyIntake = async (req: Request, res: Response) => {
    try {
      const id = 2;
      const userId = 1;
      const calories = req.body.calories;
      const carbs = req.body.carbs;
      const protein = req.body.protein;
      const fat = req.body.fat;
      const date = new Date().toISOString().slice(0, 10);
      await this.nutritionService.updateDailyIntake(
        id,
        userId,
        calories,
        carbs,
        protein,
        fat,
        date
      );
      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
