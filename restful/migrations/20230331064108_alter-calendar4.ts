import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("calendar", (table) => {
    table.text("start").nullable();
    table.text("end").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("calendar", (table) => {
    table.dropColumn("start");
    table.dropColumn("end");
  });
}