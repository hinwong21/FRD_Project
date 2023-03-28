import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("users"))) {
    await knex.schema.createTable("users", (table) => {
      table.text("id").notNullable().unique();
      table.string("username", 60).notNullable();
      table.string("password", 60).notNullable();
      table.string("email", 255).notNullable().unique();
      table.text("gender").notNullable();
      table.integer("age").notNullable();
      table.integer("height").notNullable();
      table.integer("weight").notNullable();
    });
  }

  if (!(await knex.schema.hasTable("dairy"))) {
    await knex.schema.createTable("dairy", (table) => {
      table.text("id").notNullable().unique();
      table.text("content").nullable();
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("deleted_at").nullable().defaultTo(knex.fn.now());
      table.integer("weather").notNullable();
      table.text("user_id").references("users.id");
    });
  }

  if (!(await knex.schema.hasTable("memo"))) {
    await knex.schema.createTable("memo", (table) => {
      table.text("id").notNullable().unique();
      table.text("content").nullable();
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("deleted_at").nullable().defaultTo(knex.fn.now());
      table.text("user_id").references("users.id");
    });
  }

  if (!(await knex.schema.hasTable("todolist"))) {
    await knex.schema.createTable("todolist", (table) => {
      table.text("id").notNullable().unique();
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("deleted_at").nullable().defaultTo(knex.fn.now());
      table.text("user_id").references("users.id");
    });
  }

  if (!(await knex.schema.hasTable("todolist_item"))) {
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

  if (!(await knex.schema.hasTable("calendar"))) {
    await knex.schema.createTable("calendar", (table) => {
      table.text("id").notNullable().unique();
      table.text("title").notNullable();
      table.text("description").nullable();
      table.timestamp("start").notNullable();
      table.timestamp("end").notNullable();
      table.integer("backgroundColor").notNullable();
      table.text("user_id").references("users.id");
    });
  }

  if (!(await knex.schema.hasTable("google_calendar"))) {
    await knex.schema.createTable("google_calendar", (table) => {
      table.text("id").notNullable().unique();
      table.text("content").notNullable();
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
      table.text("user_id").references("users.id");
    });
  }

  if (!(await knex.schema.hasTable("nutrition"))) {
    await knex.schema.createTable("nutrition", (table) => {
      table.text("id").notNullable().unique();
      table.integer("calories").notNullable().defaultTo(0);
      table.integer("carbs").notNullable().defaultTo(0);
      table.integer("protein").notNullable().defaultTo(0);
      table.integer("fat").notNullable().defaultTo(0);
      table.date("date").notNullable().defaultTo(knex.raw("CURRENT_DATE"));
      table.text("user_id").references("users.id");
    });
  }

  if (!(await knex.schema.hasTable("period"))) {
    await knex.schema.createTable("period", (table) => {
      table.text("id").notNullable().unique();
      table.timestamp("start_at").notNullable();
      table.timestamp("end_at").notNullable();
      table.text("user_id").references("users.id");
    });
  }

  if (!(await knex.schema.hasTable("period_state"))) {
    await knex.schema.createTable("period_state", (table) => {
      table.text("id").notNullable().unique();
      table.integer("level").notNullable().defaultTo(0);
      table.enum("symptom", [""]).notNullable();
    });
  }

  if (!(await knex.schema.hasTable("period_period_state"))) {
    await knex.schema.createTable("period_period_state", (table) => {
      table.text("id").notNullable().unique();
      table.text("period_id").references("period.id");
      table.text("period_state_id").references("period_state.id");
    });
  }

  if (!(await knex.schema.hasTable("finance"))) {
    await knex.schema.createTable("finance", (table) => {
      table.text("id").notNullable().unique();
      table.integer("budget").notNullable().defaultTo(0);
      table.text("user_id").references("users.id");
    });
  }

  if (!(await knex.schema.hasTable("transaction"))) {
    await knex.schema.createTable("transaction", (table) => {
      table.text("id").notNullable().unique();
      table.enum("category", ["Income", "Food", "Drink", "Transport", "Entertainment", "Bill", "Consumption", "Medical", "Electronic"]).notNullable();
      table.integer("amount").notNullable().defaultTo(0);
      table.text("description").nullable();
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.text("user_id").references("users.id");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("transaction");
  await knex.schema.dropTableIfExists("finance");
  await knex.schema.dropTableIfExists("period_period_state");
  await knex.schema.dropTableIfExists("period_state");
  await knex.schema.dropTableIfExists("period");
  await knex.schema.dropTableIfExists("nutrition");
  await knex.schema.dropTableIfExists("calendar");
  await knex.schema.dropTableIfExists("todolist_item");
  await knex.schema.dropTableIfExists("todolist");
  await knex.schema.dropTableIfExists("memo");
  await knex.schema.dropTableIfExists("dairy");
  await knex.schema.dropTableIfExists("users");
}
