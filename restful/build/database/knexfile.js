"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../env");
module.exports = {
    development: {
        client: "postgresql",
        connection: {
            database: env_1.env_config.DB_NAME,
            user: env_1.env_config.DB_USER,
            password: env_1.env_config.DB_PASSWORD,
            host: env_1.env_config.DB_HOST,
            port: env_1.env_config.DB_PORT
            // host: env_config.DB_HOST,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    production: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};
//# sourceMappingURL=knexfile.js.map