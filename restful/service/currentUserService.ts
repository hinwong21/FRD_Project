import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export type User = {
  username: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
};

export class CurrentUserService {
  constructor(private knex: Knex) {
    this.knex = knex;
  }

  createUser = async (input: {
    userId: string;
    username: string;
    email: string;
    pushNotificationToken: string;
  }) => {
    let [user] = await this.knex("users").select("*").where("id", input.userId);
    if (!user) {
      // insert DB
      await this.knex("users").insert({
        id: input.userId,
        username: input.username,
        email: input.email,
        push_notification_token: input.pushNotificationToken,
      });
    }
    return;
  };

  updateUser = async (userId: string, user: User) => {
    await this.knex("users").update(user).where("id", userId);
  };

  getUser = async (userId: string | undefined) => {
    let user = await this.knex("users")
      .select("*") // age,
      .where({ id: userId })
      .first();
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  };

  updateSetting = async (
    userId: string | undefined,
    height: number,
    gender: string,
    age: number,
    weight: number
  ) => {
    await this.knex("users")
      .update({
        height,
        gender,
        age,
        weight,
      })
      .where({ id: userId });
  };

  updateUsername = async (userId: string | undefined, username: string) => {
    await this.knex("users").update({ username }).where({ id: userId });
  };

  updateWeight = async (userId: string | undefined, weight: number) => {
    await this.knex("users").update({ weight }).where({ id: userId });
  };

  updateHeight = async (userId: string | undefined, height: number) => {
    await this.knex("users").update({ height }).where({ id: userId });
  };

  updateAge = async (userId: string | undefined, age: number) => {
    await this.knex("users").update({ age }).where({ id: userId });
  };

  updateGender = async (userId: string | undefined, gender: string) => {
    await this.knex("users").update({ gender }).where({ id: userId });
  };

  updateFortune = async (userId: string | undefined, fortune: string) => {
    let id = uuidv4();
    let date = new Date();
    await this.knex("fortune").insert({
      id,
      fortune,
      date,
      user_id: userId,
    });
  };

  updateField = async (
    userId: string | undefined,
    field: string,
    value: string | number
  ) => {
    await this.knex("users")
      .update({ [field]: value })
      .where({ id: userId });
  };
}
