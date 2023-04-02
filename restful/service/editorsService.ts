import express from "express";
import { Knex } from "knex";

export class EditorsService {
  constructor(private knex: Knex) {
    this.knex = knex;
  }

  addMemo = async (id: number, content:string, userId:number)=>{
    await this.knex.insert({
        id: id,
        content: content,
        user_id:userId
    }).into("memo")
  }

  
  
}