#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )
DB_PATH=$DIR/var/sqlite
DB_FILE=$DB_PATH/matomo_optout.db

echo "=== Create SQLite database and import tables"
if [ ! -e $DB_PATH ]; then
    mkdir -p $DB_PATH
fi

rm -f $DB_FILE
sqlite3 $DB_FILE < $DIR/db/matomo_optout.sql

echo "=== Install composer dependencies"
composer update --no-dev --no-progress --prefer-dist --optimize-autoloader

echo "=== Install node dependencies"
yarn install

echo "=== Start PHP server"
nohup php -S localhost:8080 -t public/ > $DIR/phpd.log 2>&1 &
PHP_SERVER_PID=$!

echo "=== Run integration tests"
yarn run cypress run --record --key $CYPRESS_IO_KEY

echo "=== Stop PHP server"
kill -3 $PHP_SERVER_PID
