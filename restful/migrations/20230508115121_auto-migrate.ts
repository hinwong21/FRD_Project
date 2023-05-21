import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transaction', table => {
    table.timestamp('effective_time').nullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transaction', table => {
    table.dropColumn('effective_time')
  })
}
