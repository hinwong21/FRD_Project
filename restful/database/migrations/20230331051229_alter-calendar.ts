import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("calendar", (table) => {
    table.dropColumn("backgroundColor");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("calendar", (table) => {
    table.dropColumn("backgroundColor");
    table.integer("backgroundColor").notNullable();
  });
}