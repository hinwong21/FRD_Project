import { Request, Response } from "express";
import express from "express";
import { errorHandler } from "../../error";
const fs = require("fs").promises;
import path from "path";
import process from "process";
import { CalendarService } from "../../service/calendarService";
import "../../session";


export class CalendarController {
    constructor(private calendarService: CalendarService) {
      this.calendarService = calendarService;
    }

    getGoogleCalendarEvent = async (req:Request, res:Response)=>{
        let data = await this.calendarService.getGoogleCalendarEvent(1)
        console.log(data);
        res.json(data)
    }
}  