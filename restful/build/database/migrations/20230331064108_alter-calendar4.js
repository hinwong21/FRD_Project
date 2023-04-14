"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable("calendar", (table) => {
        table.text("start").nullable();
        table.text("end").nullable();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable("calendar", (table) => {
        table.dropColumn("start");
        table.dropColumn("end");
    });
}
exports.down = down;
//# sourceMappingURL=20230331064108_alter-calendar4.js.map