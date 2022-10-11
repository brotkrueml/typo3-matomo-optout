#!/bin/bash

if [[ $# -eq 0 ]]; then
    echo "No TYPO3 version supplied, possible values: [10, 11, 12]"
    exit 1
fi

if [[ "$1" != "10" && "$1" != "11" && "$1" != "12" ]]; then
    echo "No valid TYPO3 version supplied, possible values: [10, 11, 12]"
    exit 1
fi

TYPO3_VERSION="$1"
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )
DB_PATH=$DIR/var/sqlite
DB_FILE=$DB_PATH/matomo_optout.db

echo "=== Create SQLite database and import tables"
if [ ! -e "$DB_PATH" ]; then
    mkdir -p "$DB_PATH"
fi

rm -f $DB_FILE
sqlite3 $DB_FILE < $DIR/db/matomo_optout_v"$TYPO3_VERSION".sql

if [[ "$TYPO3_VERSION" -lt "12" ]]; then
    echo "=== Copy TYPO3 settings"
    cp public/typo3conf/LocalConfiguration_v"$TYPO3_VERSION".php public/typo3conf/LocalConfiguration.php
fi

echo "=== Install composer dependencies"
rm -f composer.lock
case $TYPO3_VERSION in
    10)
        composer require typo3/cms-core=^10 helhum/typo3-console=^6 --no-update
        composer update --no-progress --prefer-dist --optimize-autoloader
        vendor/bin/typo3cms install:generatepackagestates
        ;;
    default)
        composer require typo3/cms-core:^"$TYPO3_VERSION" --no-update
        composer update --no-progress --prefer-dist --optimize-autoloader
        vendor/bin/typo3 extension:setup
        ;;
esac
git checkout composer.json

echo "=== Install node dependencies"
yarn install

echo "=== Start PHP server"
nohup php -S localhost:8080 -t public/ > "$DIR"/phpd.log 2>&1 &
PHP_SERVER_PID=$!

echo "=== Run integration tests"
yarn run cypress run

echo "=== Stop PHP server"
kill -3 $PHP_SERVER_PID

if [[ "$TYPO3_VERSION" -lt "12" ]]; then
    echo "=== Remove copied TYPO3 settings"
    rm -f public/typo3conf/LocalConfiguration.php
fi
