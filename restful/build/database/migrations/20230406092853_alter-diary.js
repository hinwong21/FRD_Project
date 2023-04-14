"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable("dairy", (table) => {
        table.text("title").nullable();
        table.text("mood").nullable();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable("dairy", (table) => {
        table.dropColumn("title");
        table.dropColumn("mood");
    });
}
exports.down = down;
//# sourceMappingURL=20230406092853_alter-diary.js.map