import { Knex } from "knex";

export class CalendarService {
  constructor(private knex: Knex) {
    this.knex = knex;
  }

  getGoogleCalendarEvent = async (userId: string) => {
    let data = await this.knex("google_calendar")
      .select("*")
      .where("user_id", userId);

    console.log(data);

    return data;
  };

  getLocalCalendarEvent = async (userId: string) => {
    let row = await this.knex("calendar")
      .select("content")
      .where("user_id", userId)
      .first();

    if (row?.content) {
      return JSON.parse(row.content);
    }
    return [];
  };

  createLocalCalendarEvent = async (eventData: any, userId: string) => {
    await this.knex
      .insert({
        id: eventData.id,
        title: eventData.title,
        description: eventData.description,
        start: eventData.start,
        end: eventData.end,
        backgroundColor: eventData.backgroundColor,
        user_id: userId,
      })
      .into("calendar");
  };
}
