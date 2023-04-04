psql -U noticias -W noticias

# drop db migration record (if found migration directory is corrupt(missing file))

drop table knex_migrations;
drop table knex_migrations_lock;

npx knex migrate:down --knexfile database/knexfile.ts

npx knex migrate:latest --knexfile database/knexfile.ts

npx knex seed:run --knexfile database/knexfile.ts

# xcode install
xcode-select --install
xcode-select -p
brew help
brew install cocoapods
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
# open xcode
npx cap sync
npx cap open ios
