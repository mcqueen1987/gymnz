
### ENV
PHP 7.3\n
composer\n
mysql 5.7\n
yarn\n


### PREPARE

1. (optional) `composer self-update`
2. install php dependency `composer install`
3. install js dependency `yarn install`
4. `cp .env.example .env` then update DB_\* settings in `.env`
5.  you need create database with name DB_DATABASE manually
6.  migrate database: `php artisan migrate`
7.  init app secret: `php artisan key:generate`
8.  init jwt secret:  `php artisan jwt:secret`
9.  rebuild cache: `php artisan config:cache`


### RUN
1. build front-end: `yarn watch` (refer to package.json for more)
2. start dev server: `php artisan serve`





