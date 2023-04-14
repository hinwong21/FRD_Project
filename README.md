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

ionic build
npx cap sync
npx cap open ios

# nginx

server {
server_name api.karaoke-gcat.me;
root /var/www/html;

client_max_body_size 100M;

location / {
proxy_pass http://localhost:8090;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}

}
