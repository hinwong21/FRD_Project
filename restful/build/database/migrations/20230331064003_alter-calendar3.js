"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable("calendar", (table) => {
        table.dropColumn("start");
        table.dropColumn("end");
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable("calendar", (table) => {
        table.timestamp("start").notNullable();
        table.timestamp("end").notNullable();
    });
}
exports.down = down;
//# sourceMappingURL=20230331064003_alter-calendar3.js.map