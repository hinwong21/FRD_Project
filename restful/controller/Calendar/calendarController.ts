import { Request, Response } from "express";
import express from "express";
import { errorHandler } from "../../error";
import { CalendarService } from "../../service/calendarService";
import "../../session";


export class CalendarController {
    constructor(private calendarService: CalendarService) {
      this.calendarService = calendarService;
    }

    getGoogleCalendarEvent = async (req:Request, res:Response)=>{
      try{
        let data = await this.calendarService.getGoogleCalendarEvent(req.session.userId as number)
        res.json(data)
      }catch (err){
        errorHandler(err, req, res);
      }
    }

    getLocalCalendarEvent = async (req:Request, res:Response)=>{
      try{
        let data = await this.calendarService.getLocalCalendarEvent(req.session.userId as number)
        res.json(data)

      }catch (err){
        errorHandler(err, req, res);
      }
        
    }

    createLocalCalendarEvent = async (req:Request, res:Response)=>{
      try{
        let eventData = req.body
        console.log(eventData)

        await this.calendarService.createLocalCalendarEvent(eventData, req.session.userId as number)

        res.json({success: true})

      }catch (err){
        errorHandler(err, req, res);
      }

    }
}  