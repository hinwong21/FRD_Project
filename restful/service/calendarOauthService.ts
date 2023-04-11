import { Knex } from "knex";
<<<<<<< HEAD
import { v4 as uuidv4 } from "uuid";
=======
import { v4 as uuidv4 } from 'uuid';
>>>>>>> f3113e1137665f03642942135dc633437808749a

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
