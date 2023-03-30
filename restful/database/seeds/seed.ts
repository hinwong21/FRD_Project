import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("transaction").del();
  await knex("finance").del();
  await knex("period_period_state").del();
  await knex("period_state").del();
  await knex("period").del();
  await knex("nutrition").del();
  await knex("calendar").del();
  await knex("todolist_item").del();
  await knex("todolist").del();
  await knex("memo").del();
  await knex("dairy").del();
  await knex("users").del();

  // Inserts seed entries
  let [tony] = await knex("users")
    .insert([
      {
        id: 1,
        username: "t123",
        email: "t123@gmail.com",
        gender: "male",
        age: 23,
        height: 170,
        weight: 60,
      },
    ])
    .returning("id");
  await knex("nutrition").insert([
    {
      id: 2,
      user_id: tony.id,
      calories: 52.3,
      carbs: 3.5,
      protein: 26.555,
      fat: 47.3333,
      date: "2023-03-30",
    },
  ]);
}
