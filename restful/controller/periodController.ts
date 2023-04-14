import { Request, Response } from "express";
import { PeriodService } from "../service/periodService";
import { errorHandler } from "../error";

export class PeriodController {
  constructor(private periodService: PeriodService) {}

  getUpcomingDate = async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId!;
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
      const userId = "62a9d8ff-e9b0-4cdc-8a9d-b714ab3b9a33";
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
      const start_at = req.body?.start_at;
      const end_at = req.body?.end_at;
      const upcoming_at = req.body?.upcoming_at;
      const days = req.body?.days;
      const ovu_start_at = req.body?.ovu_start_at;
      const ovu_end_at = req.body?.ovu_end_at;

      await this.periodService.updatePeriodData(
        id,
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

  inputStatus = async (req: Request, res: Response) => {
    try {
      const statusId = req.body.statusId;
      const periodId = req.body.periodId;
      const type = req.body.type;
      const content = req.body.content;

      await this.periodService.inputPeriodStatus(
        statusId,
        periodId,
        type,
        content
      );

      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      const statusId = req.body.statusId;
      // const statusId = "testSts3";
      const type = req.body.type;
      // const type = "Updatetype3";
      const content = req.body.content;
      // const content = "updateContent3";

      await this.periodService.updatePeriodStatus(statusId, type, content);

      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  getStatus = async (req: Request, res: Response) => {
    try {
      const periodId = req.body.periodId;
      const result = await this.periodService.getPeriodStatus(periodId);

      res.json({ result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
