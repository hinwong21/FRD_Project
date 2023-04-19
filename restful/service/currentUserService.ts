import { Knex } from "knex";
import { User, updateUserByUID } from "../firebaseAdmin";
import { v4 as uuidv4 } from "uuid";

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
    let txn = await this.knex.transaction();
    try {
      await txn("users").update(user).where("id", userId);
      await updateUserByUID(userId, user);
      await txn.commit();
    } catch (err) {
      await txn.rollback();
      throw new Error(`${err.message}`);
    }
  };

  getUser = async (userId: string | undefined) => {
    try {
      let user = await this.knex("users")
        .select("*") // age,
        .where({ id: userId })
        .first();
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  };

  updateData = async (
    userId: string | undefined,
    height: number,
    gender: string,
    age: number,
    weight: number
  ) => {
    try {
      await this.knex("users")
        .update({
          height,
          gender,
          age,
          weight,
        })
        .where({ id: userId });
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  };
  updateUsername = async (userId: string | undefined, username: string) => {
    try {
      await this.knex("users").update({ username }).where({ id: userId });
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  };

  updateWeight = async (userId: string | undefined, weight: number) => {
    try {
      await this.knex("users").update({ weight }).where({ id: userId });
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  };

  updateHeight = async (userId: string | undefined, height: number) => {
    try {
      await this.knex("users").update({ height }).where({ id: userId });
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  };

  updateAge = async (userId: string | undefined, age: number) => {
    try {
      await this.knex("users").update({ age }).where({ id: userId });
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  };

  updateGender = async (userId: string | undefined, gender: string) => {
    try {
      await this.knex("users").update({ gender }).where({ id: userId });
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  };

  updateFortune = async (userId: string | undefined, fortune: string) => {
    try {
      let id = uuidv4();
      let date = new Date();
      await this.knex("fortune").insert({
        id,
        fortune,
        date,
        user_id: userId,
      });
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  };

  updateField = async (
    userId: string | undefined,
    field: string,
    value: string | number
  ) => {
    try {
      await this.knex("users")
        .update({ [field]: value })
        .where({ id: userId });
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  };
}
