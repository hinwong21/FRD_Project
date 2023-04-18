#!/usr/bin/env bash
set -e
set -x

npm run build

rsync -SavLP \
  build \
  migrations \
  knexfile.ts \
  env.ts \
  package.json \
  api.karaoke-gcat.me:~/FRD_Project/restful

ssh api.karaoke-gcat.me "
  cd ~/FRD_Project/restful && \
  npm i && \
  npx knex migrate:latest && \
  pm2 restart server && \
  pm2 log server
"
