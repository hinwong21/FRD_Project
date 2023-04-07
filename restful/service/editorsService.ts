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
      .where("user_id", userId)
    console.log(memos)
    return memos;
  }

  updateMemo = async (id: number, content: string) => {
    await this.knex.update({
      content: content,
      updated_at: new Date()
    })
      .where("id", id)
  }


}