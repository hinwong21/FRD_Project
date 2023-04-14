"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable("calendar", (table) => {
        table.dropColumn("backgroundColor");
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable("calendar", (table) => {
        table.dropColumn("backgroundColor");
        table.integer("backgroundColor").notNullable();
    });
}
exports.down = down;
//# sourceMappingURL=20230331051229_alter-calendar.js.map