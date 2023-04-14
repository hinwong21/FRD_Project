"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.dropTableIfExists("todolist_item");
}
exports.up = up;
async function down(knex) {
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
exports.down = down;
//# sourceMappingURL=20230412084817_alter-todo.js.map