import { Request, Response } from "express";
import { NutritionService } from "../service/nutritionService";
import { errorHandler } from "../error";

export class NutritionController {
  constructor(private nutritionService: NutritionService) {}

  getDailyIntake = async (req: Request, res: Response) => {
    try {
      //   const userId = req.session.userId!;
      const userId = 1
      const result = await this.nutritionService.getDailyIntake(userId);

      res.json({ result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}

