import { env } from "../env";
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: env.DB_NAME,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      host: env.DB_HOST,
      port: env.DB_PORT,
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
