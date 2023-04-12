import { Knex } from "knex";
import { User, updateUserByUID } from "../firebaseAdmin";

export class CurrentUserService {
  constructor(private knex: Knex) {
    this.knex = knex;
  }

  createUser = async (
    userId: string,
    username: string,
    email: string,
    pushNotificationToken: string
  ) => {
    let [user] = await this.knex("users").select("*").where("id", userId);
    if (!user) {
      // insert DB
      await this.knex("users").insert({
        id: userId,
        username: username,
        email: email,
        push_notification_token: pushNotificationToken,
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
      let user = await this.knex("users").select("*").where({ id: userId });
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
}
