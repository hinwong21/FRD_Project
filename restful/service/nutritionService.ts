import { Knex } from "knex";

export class NutritionService {
  constructor(private knex: Knex) {}

  getDailyIntake = async (userId: number) => {
    try {
      let user = await this.knex("users").select("*").where("id", userId);
      return user;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  updateDailyIntake = async (
    id: number,
    userId: number,
    calories: number,
    carbs: number,
    protein: number,
    fat: number,
    date: string
  ) => {
    try {
      const checkIntake = await this.knex("nutrition")
        .where({ user_id: userId })
        .andWhere({ date: date })
        .select();

      if (checkIntake.length > 0) {
        await this.knex("nutrition")
          .where({ user_id: userId, date: date })
          .update({
            calories: this.knex.raw(`calories + ${calories}`),
            carbs: this.knex.raw(`carbs + ${carbs}`),
            protein: this.knex.raw(`protein + ${protein}`),
            fat: this.knex.raw(`fat + ${fat}`),
          });
      } else {
        console.log(calories, carbs, protein, fat, date);
        // await this.knex("users").insert({
        //   id: 3,
        //   username: "jim",
        //   email: "jim@ema",
        //   gender: "male",
        //   age: 30,
        //   height: 175,
        //   weight: 65,
        // });
        let [obj] = await this.knex("nutrition")
          .insert({
            id: id,
            user_id: userId,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat,
            date: date,
          })
          .returning("*");
        console.log(obj);
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
}
