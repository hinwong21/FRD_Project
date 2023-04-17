import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("period_status", (table) => {
    table.text("period_id").unsigned().nullable().references("period.id");
  });

  let rows = await knex("period_period_status").select(
    "period_id",
    "period_status_id"
  );
  for (let row of rows) {
    await knex("period_status")
      .update({ period_id: row.period_id })
      .where("id", row.period_status_id);
  }

  await knex.schema.dropTable("period_period_status");
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable("period_period_status", (table) => {
    table.text("id").notNullable().unique();
    table.text("period_id").references("period.id");
    table.text("period_status_id").references("period_status.id");
  });

  let rows = await knex("period_status").select("id", "period_id");
  for (let row of rows) {
    await knex("period_period_status").insert({
      period_id: row.period_id,
      period_status_id: row.id,
    });
  }

  await knex.schema.alterTable("period_status", (table) => {
    table.dropColumn("period_id");
  });
}
