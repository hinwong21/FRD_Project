import { Knex } from "knex";

export class EditorsService {
  constructor(private knex: Knex) {
    this.knex = knex;
  }

  addMemo = async (id: string, content: string, userId: string) => {
    await this.knex
      .insert({
        id: id,
        content: JSON.stringify(content),
        user_id: userId,
      })
      .into("memo");
  };

  getMemo = async (userId: string) => {
    const memos = await this.knex("memo").select("*").where("user_id", userId);
    return memos;
  };

  updateMemo = async (id: string, content: string) => {
    await this.knex("memo")
      .update({
        content: JSON.stringify(content),
        updated_at: new Date(),
      })
      .where("id", id);
  };

  newDiary = async (
    id: string,
    content: string,
    weather: string,
    title: string,
    mood: string,
    userId: string
  ) => {
    await this.knex
      .insert({
        id: id,
        content: JSON.stringify(content),
        weather: JSON.stringify(weather),
        title: title,
        mood: mood,
        user_id: userId,
      })
      .into("dairy");
  };

  getDiary = async (userId: string) => {
    const diaries = await this.knex("dairy")
      .select("*")
      .where("user_id", userId);
    return diaries;
  };
}
