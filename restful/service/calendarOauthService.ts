import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid';

export class CalendarOauthService {
  constructor(private knex: Knex) {
    this.knex = knex;
  }

  calendarAuthorization = async (userId: string, content: {}[]) => {
    await this.knex("google_calendar").insert({
      id: uuidv4(),
      user_id: userId,
      content: JSON.stringify(content),
    });
  };
}
