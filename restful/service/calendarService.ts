import express from "express";
import {Knex} from "knex";

export class CalendarService {
    constructor(private knex:Knex){
        this.knex = knex;
    }

    calendarAuthorization = async (userId : number, content:[{}]) => {
        await this.knex("google_calendar")
        .insert({
          user_id: userId,
          content: content
        })
    }

}