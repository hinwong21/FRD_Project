import { Request, Response } from "express";
import { PeriodService } from "../service/periodService";
import { errorHandler } from "../error";
import { getJWT } from "../jwt";

export class PeriodController {
  constructor(private periodService: PeriodService) {}

  getUpcomingDate = async (req: Request, res: Response) => {
    try {
      const userId = getJWT(req).userId;
      console.log("Controller userID:", userId);

      const result = await this.periodService.getUpcomingAt(userId);

      res.json({ result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  inputPeriodData = async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      const userId = getJWT(req).userId;
      const start_at = req.body.start_at;
      const end_at = req.body.end_at;
      const upcoming_at = req.body.upcoming_at;
      const days = req.body.days;
      const ovu_start_at = req.body.ovu_start_at;
      const ovu_end_at = req.body.ovu_end_at;

      await this.periodService.inputAllPeriodData(
        id,
        userId,
        start_at,
        end_at,
        upcoming_at,
        days,
        ovu_start_at,
        ovu_end_at
      );

      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updatePeriod = async (req: Request, res: Response) => {
    try {
      const id = req.body.id; //Period id

      const { start_at, end_at, upcoming_at, days, ovu_start_at, ovu_end_at } =
        req.body;

      await this.periodService.updatePeriodData({
        period_id: id,
        user_id: getJWT(req).userId,
        fields: {
          start_at,
          end_at,
          upcoming_at,
          days,
          ovu_start_at,
          ovu_end_at,
        },
      });
      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  inputStatus = async (req: Request, res: Response) => {
    try {
      let user_id = getJWT(req).userId;
      const statusId = req.body.statusId;
      const periodId = req.body.periodId;
      const type = req.body.type;
      const content = req.body.content;

      await this.periodService.inputPeriodStatus({
        period_id: periodId,
        user_id,
        type,
        content,
        status_id: statusId,
      });

      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      let user_id = getJWT(req).userId;
      const statusId = req.body.statusId;
      const type = req.body.type;
      const content = req.body.content;

      await this.periodService.updatePeriodStatus({
        user_id,
        type,
        content,
        status_id: statusId,
      });

      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  getStatus = async (req: Request, res: Response) => {
    try {
      let user_id = getJWT(req).userId;
      const period_id = req.body.periodId;
      const result = await this.periodService.getPeriodStatus({
        period_id,
        user_id,
      });
      res.json({ result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
