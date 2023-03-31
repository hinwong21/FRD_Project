psql -U noticias -W noticias

# drop db migration record (if found migration directory is corrupt(missing file))
drop table knex_migrations;
drop table knex_migrations_lock;


npx knex migrate:down --knexfile database/knexfile.ts

npx knex migrate:latest --knexfile database/knexfile.ts

npx knex seed:run --knexfile database/knexfile.ts
