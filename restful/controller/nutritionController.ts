import { Request, Response } from "express";
import { NutritionService } from "../service/nutritionService";
import { errorHandler } from "../error";
import "../session";

export class NutritionController {
  constructor(private nutritionService: NutritionService) {}

  getDailyIntake = async (req: Request, res: Response) => {
    try {
<<<<<<< HEAD
      // const userId = req.session.userId!;
      const userId = "1";
=======
      const userId = req.session.userId!;
>>>>>>> f3113e1137665f03642942135dc633437808749a
      const date = new Date();
      const result = await this.nutritionService.getDailyIntake(userId, date);

      res.json({ result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateDailyIntake = async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
<<<<<<< HEAD
      const userId = "1";
=======
      const userId = req.session.userId!;
>>>>>>> f3113e1137665f03642942135dc633437808749a
      const calories = req.body.calories;
      const carbs = req.body.carbs;
      const protein = req.body.protein;
      const fat = req.body.fat;
      const date = new Date();
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
