import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("memo", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("google_calendar", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("nutrition", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("period", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("period_status", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("period_period_status", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("finance", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("calendar", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("dairy", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("hashtags", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("todolist", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("todo_memo", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("todo_hashtag", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("todo_shared", (table) => {
    table.primary(["id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("todo_shared", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("todo_hashtag", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("todo_memo", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("todolist", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("hashtags", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("dairy", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("calendar", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("finance", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("period_period_status", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("period_status", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("period", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("nutrition", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("google_calendar", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("memo", (table) => {
    table.primary(["id"]);
  });
  await knex.schema.alterTable("users", (table) => {
    table.primary(["id"]);
  });
}
