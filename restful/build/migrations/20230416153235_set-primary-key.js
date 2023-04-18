"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('users', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('memo', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('google_calendar', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('nutrition', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('period', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('period_status', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('period_period_status', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('finance', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('calendar', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('dairy', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('hashtags', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('todolist', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('todo_memo', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('todo_hashtag', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('todo_shared', table => {
        table.primary(['id']);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('todo_shared', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('todo_hashtag', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('todo_memo', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('todolist', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('hashtags', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('dairy', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('calendar', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('finance', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('period_period_status', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('period_status', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('period', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('nutrition', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('google_calendar', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('memo', table => {
        table.primary(['id']);
    });
    await knex.schema.alterTable('users', table => {
        table.primary(['id']);
    });
}
exports.down = down;
//# sourceMappingURL=20230416153235_set-primary-key.js.map