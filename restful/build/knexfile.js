"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
module.exports = {
    development: {
        client: "postgresql",
        connection: {
            database: env_1.env.DB_NAME,
            user: env_1.env.DB_USER,
            password: env_1.env.DB_PASSWORD,
            host: env_1.env.DB_HOST,
            port: env_1.env.DB_PORT,
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
};
//# sourceMappingURL=knexfile.js.map