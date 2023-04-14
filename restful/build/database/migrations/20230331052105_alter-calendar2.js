"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable("calendar", (table) => {
        table.text("backgroundColor");
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable("calendar", (table) => {
        table.dropColumn("backgroundColor");
    });
}
exports.down = down;
//# sourceMappingURL=20230331052105_alter-calendar2.js.map