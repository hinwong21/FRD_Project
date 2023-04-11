import express from "express";
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
    console.log(memos);
    return memos;
  };
}
