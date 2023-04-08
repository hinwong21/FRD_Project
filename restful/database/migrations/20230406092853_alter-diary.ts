import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("dairy", (table) => {
    table.text("title").nullable();
      table.text("mood").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("dairy", (table) => {
    table.dropColumn("title");
    table.dropColumn("mood");
  });
}