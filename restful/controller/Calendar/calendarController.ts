import { Request, Response } from "express";
import { errorHandler } from "../../error";
import { CalendarService } from "../../service/calendarService";
import "../../session";

export class CalendarController {
  constructor(private calendarService: CalendarService) {
    this.calendarService = calendarService;
  }

  getGoogleCalendarEvent = async (req: Request, res: Response) => {
    try {
<<<<<<< HEAD
      let data = await this.calendarService.getGoogleCalendarEvent(
        req.session.userId as string
      );
      res.json(data);
=======
      let data = await this.calendarService.getGoogleCalendarEvent(req.session.userId as string)
      res.json(data)
    } catch (err) {
      errorHandler(err, req, res);
    }
  }

  getLocalCalendarEvent = async (req: Request, res: Response) => {
    try {
      let data = await this.calendarService.getLocalCalendarEvent(req.session.userId as string)
      res.json(data)

>>>>>>> f3113e1137665f03642942135dc633437808749a
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

<<<<<<< HEAD
  getLocalCalendarEvent = async (req: Request, res: Response) => {
    try {
      let data = await this.calendarService.getLocalCalendarEvent(
        req.session.userId as string
      );
      res.json(data);
=======
  }

  createLocalCalendarEvent = async (req: Request, res: Response) => {
    try {
      let eventData = req.body
      console.log(eventData)

      await this.calendarService.createLocalCalendarEvent(eventData, req.session.userId as string)

      res.json({ success: true })

>>>>>>> f3113e1137665f03642942135dc633437808749a
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

<<<<<<< HEAD
  createLocalCalendarEvent = async (req: Request, res: Response) => {
    try {
      let eventData = req.body;
      console.log(eventData);

      await this.calendarService.createLocalCalendarEvent(
        eventData,
        req.session.userId as string
      );

      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
=======
  }
}  
>>>>>>> f3113e1137665f03642942135dc633437808749a
