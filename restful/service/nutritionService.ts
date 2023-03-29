import { Knex } from "knex";

export class NutritionService {
  constructor(private knex: Knex) {}

  getDailyIntake = async (userId: number) => {
    try {
      let user = await this.knex("users").select("*").where("id", userId);
      console.log(user);
      return user;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
}
