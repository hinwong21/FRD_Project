import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("todolist", (table) => {
        table.text("title");
        table.text("due_date");
        table.text("hashtag");
        table.text("email_shared");
        table.text("task");
        table.text("memo");
      });

      await knex.schema.createTable("todo_memo", (table) => {
        table.text("id").notNullable().unique();
        table.text("memo_id").references("memo.id");
        table.text("todolist_id").references("todolist.id");
      });

      await knex.schema.createTable("todo_hashtag", (table) => {
        table.text("id").notNullable().unique();
        table.text("hashtags_id").references("hashtags.id");
        table.text("todolist_id").nullable().references("todolist.id");
        table.text("memo_id").nullable().references("memo.id");
      });

      await knex.schema.createTable("todo_shared", (table) => {
        table.text("id").notNullable().unique();
        table.text("todolist_id").nullable().references("todolist.id");
        table.text("users_id").nullable().references("users.id");
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("todolist", (table) => {
        table.dropColumn("title");
        table.dropColumn("due_date");
        table.dropColumn("hashtag");
        table.dropColumn("email_shared");
        table.dropColumn("task");
        table.dropColumn("memo");
        table.text("user_id").references("users.id");
      });
      await knex.schema.dropTableIfExists("todo_memo");
      await knex.schema.dropTableIfExists("todo_hashtag");
      await knex.schema.dropTableIfExists("todo_shared");
}

