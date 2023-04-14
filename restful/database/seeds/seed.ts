import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("transaction").del();
  await knex("finance").del();
  await knex("period_period_status").del();
  await knex("period_status").del();
  await knex("period").del();
  await knex("nutrition").del();
  await knex("google_calendar").del();
  await knex("calendar").del();
  await knex("todolist").del();
  await knex("todo_hashtag").del();
  await knex("todo_shared").del();
  await knex("todo_memo").del();
  await knex("memo").del();
  await knex("dairy").del();
  await knex("users").del();

  // Inserts seed entries
  //User Part Table
  let [tony, nami] = await knex("users")
    .insert([
      {
        id: `xphm24xfEKTGnSjlReSGvo1lJQm2`,
        username: "t123",
        email: "paul6541yau@gmail.com",
        gender: "male",
        age: 23,
        height: 170,
        weight: 60,
      },
      {
        id: `${uuidv4()}`,
        username: "nami",
        email: "naminami@gmail.com",
        gender: "female",
        age: 23,
        height: 170,
        weight: 52,
      },
    ])
    .returning("id");
  console.log(tony.id);
  console.log(nami.id);

  // Accounting Part Table
  await knex("transaction")
    .insert([
      {
        category: "Income",
        type: "income",
        amount: 52,
        user_id: "xphm24xfEKTGnSjlReSGvo1lJQm2",
        description: undefined,
      },
    ])
    .returning("id");

  // Period Part Table
  let [namiFeb, namiMar] = await knex("period")
    .insert([
      {
        id: `${uuidv4()}`,
        start_at: "2023-02-07",
        end_at: "2023-02-11",
        upcoming_at: "2023-03-07",
        days: "5",
        ovu_start_at: "2023-02-16",
        ovu_end_at: "2023-02-22",
        user_id: nami.id,
      },
      {
        id: `${uuidv4()}`,
        start_at: "2023-03-05",
        end_at: "2023-03-10",
        upcoming_at: "2023-04-02",
        days: "6",
        ovu_start_at: "2023-03-15",
        ovu_end_at: "2023-03-21",
        user_id: nami.id,
      },
    ])
    .returning("id");

  let [febStatusOne, febStatusTwo, febStatusThree, marStatusOne, marStatusTwo] =
    await knex("period_status")
      .insert([
        {
          id: `${uuidv4()}`,
          type: "menstrual flow",
          content: "3",
          created_at: "2023-02-07",
          updated_at: "2023-02-07",
        },
        {
          id: `${uuidv4()}`,
          type: "lower back pain",
          content: "1",
          created_at: "2023-02-07",
          updated_at: "2023-02-07",
        },
        {
          id: `${uuidv4()}`,
          type: "headache",
          content: "1",
          created_at: "2023-02-07",
          updated_at: "2023-02-07",
        },
        {
          id: `${uuidv4()}`,
          type: "headache",
          content: "1",
          created_at: "2023-03-08",
          updated_at: "2023-03-08",
        },
        {
          id: `${uuidv4()}`,
          type: "fatigue",
          content: "2",
          created_at: "2023-03-08",
          updated_at: "2023-03-08",
        },
      ])
      .returning("id");

  await knex("period_period_status").insert([
    {
      id: `${uuidv4()}`,
      period_id: namiFeb.id,
      period_status_id: febStatusOne.id,
    },
    {
      id: `${uuidv4()}`,
      period_id: namiFeb.id,
      period_status_id: febStatusTwo.id,
    },
    {
      id: `${uuidv4()}`,
      period_id: namiFeb.id,
      period_status_id: febStatusThree.id,
    },
    {
      id: `${uuidv4()}`,
      period_id: namiMar.id,
      period_status_id: marStatusOne.id,
    },
    {
      id: `${uuidv4()}`,
      period_id: namiMar.id,
      period_status_id: marStatusTwo.id,
    },
  ]);
}
