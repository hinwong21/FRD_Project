import express from "express";
import { Knex } from "knex";

export class CalendarService {
  constructor(private knex: Knex) {
    this.knex = knex;
  }

  newEvent = async (
    title: string,
    description: string,
    start: string,
    end: string,
    backgroundColor: string,
    userId: string
  ) => {
    await this.knex("calendar").insert({
      title: title,
      description: description,
      start: start,
      end: end,
      backgroundColor: backgroundColor,
      user_id: userId,
    });
  };

  getGoogleCalendarEvent = async (userId:number)=>{
      let data = await this.knex("google_calendar")
      .select("*")
      .where("user_id", userId)

      console.log(data);
      
      return data;
  }

}
