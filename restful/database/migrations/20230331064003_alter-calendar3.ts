import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("calendar", (table) => {
    table.dropColumn("start");
    table.dropColumn("end");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("calendar", (table) => {
    table.timestamp("start").notNullable();
    table.timestamp("end").notNullable();
  });
}
