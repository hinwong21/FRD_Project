"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable("hashtags", (table) => {
        table.text("id").notNullable().unique();
        table.text("name").notNullable();
        table.text("user_id").references("users.id");
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists("hashtags");
}
exports.down = down;
//# sourceMappingURL=20230412084947_createTable-hashtags.js.map