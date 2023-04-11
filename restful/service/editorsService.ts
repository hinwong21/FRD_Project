import { Knex } from "knex";

export class EditorsService {
  constructor(private knex: Knex) {
    this.knex = knex;
  }

  addMemo = async (id: number, content: string, userId: number) => {
    await this.knex.insert({
      id: id,
      content: JSON.stringify(content),
      user_id: userId
    }).into("memo")
  }

  getMemo = async (userId: number) => {
    const memos = await this.knex("memo")
    .select("*")
    .where("user_id",userId)
    return memos;
  }

  updateMemo = async (id:string, content: string)=>{
     await this.knex("memo")
    .update({
      content:JSON.stringify(content),
      updated_at: new Date()
    })
    .where("id", id);
  }

  newDiary = async (id:number, content:string, weather: string,title:string,mood:string, userId:number)=>{
    await this.knex
    .insert({
      id: id,
      content: JSON.stringify(content),
      weather: JSON.stringify(weather),
      title:title,
      mood:mood,
      user_id: userId
    })
    .into("dairy")
  }

  getDiary = async (userId:number)=>{
    const diaries = await this.knex("dairy")
    .select("*")
    .where("user_id",userId)
    return diaries;
  }

}
