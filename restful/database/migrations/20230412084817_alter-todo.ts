import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("todolist_item");
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.createTable("todolist_item", (table) => {
        table.text("id").notNullable().unique();
        table.text("content").notNullable();
        table.boolean("done").notNullable().defaultTo(false);
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("deleted_at").nullable().defaultTo(knex.fn.now());
        table.text("todolist_id").references("todolist.id");
      });
}

