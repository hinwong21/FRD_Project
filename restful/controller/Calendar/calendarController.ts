import { Request, Response } from "express";
import express from "express";
import { errorHandler } from "../../error";
const fs = require("fs").promises;
import path from "path";
import process from "process";
import { CalendarService } from "../../service/calendarService";
import "../../session";


export class OauthController {
    constructor(private calendarService: CalendarService) {
      this.calendarService = calendarService;
    }

    localCalendarEvent = async (req:Request, res:Response)=>{
        
    }
}  