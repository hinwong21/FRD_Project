import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("nutrition"))) {
    await knex.schema.createTable("nutrition", (table) => {
      table.text("id").notNullable().unique();
      table.float("calories").notNullable();
      table.float("carbs").notNullable();
      table.float("protein").notNullable();
      table.float("fat").notNullable();
      table.date("date").notNullable();
      table.text("user_id").unsigned();
      table.foreign("user_id").references("users.id");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("nutrition");
}
