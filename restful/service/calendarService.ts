import { Knex } from "knex";

export class CalendarService {
  constructor(private knex: Knex) {
    this.knex = knex;
  }

<<<<<<< HEAD
=======

>>>>>>> f3113e1137665f03642942135dc633437808749a
  getGoogleCalendarEvent = async (userId: string) => {
    let data = await this.knex("google_calendar")
      .select("*")
      .where("user_id", userId);

    console.log(data);
<<<<<<< HEAD

    return data;
  };

  getLocalCalendarEvent = async (userId: string) => {
    let data = await this.knex("calendar").select("*").where("user_id", userId);

    console.log(data);

    return data;
  };

=======

    return data;
  }

  getLocalCalendarEvent = async (userId: string) => {
    let data = await this.knex("calendar")
      .select("*")
      .where("user_id", userId)

    console.log(data);

    return data;
  }

>>>>>>> f3113e1137665f03642942135dc633437808749a
  createLocalCalendarEvent = async (eventData: any, userId: string) => {
    await this.knex
      .insert({
        id: eventData.id,
        title: eventData.title,
        description: eventData.description,
        start: eventData.start,
        end: eventData.end,
        backgroundColor: eventData.backgroundColor,
<<<<<<< HEAD
        user_id: userId,
      })
      .into("calendar");
  };
=======
        user_id: userId
      })
      .into("calendar")

  }

>>>>>>> f3113e1137665f03642942135dc633437808749a
}
