import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("hashtags", (table) => {
        table.text("id").notNullable().unique();
        table.text("name").notNullable();
        table.text("user_id").references("users.id");
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("hashtags");
}

