psql -U noticias -W noticias

npx knex migrate:down --knexfile database/knexfile.ts

npx knex migrate:latest --knexfile database/knexfile.ts

npx knex seed:run --knexfile database/knexfile.ts
