
# Voucher Test Case

### Requirement :

- Node js : >14.0.0
- Mysql : >8.0.0

### Development Setup

- git pull
- npm install

### Config

- .env = template example
- .env.dev = for development only
- .env.prod = for production

|  config | description  |
|--|--|
| NODE_ENV | environtment : dev, prod |
| APP_URL | base url  |
| PORT| port|
| TYPEORM_CONNECTION| database |
| TYPEORM_USERNAME| database username |
| TYPEORM_PASSWORD| database password |
| TYPEORM_PORT| database port|
| TYPEORM_DATABASE| database name |
| TYPEORM_MIGRATIONS_RUN| set true, if you want to automatically run migration when starting up app |
| TYPEORM_MIGRATIONS| migration directory |
| TYPEORM_LOGGING| set true if you want to see database/query log|
| VOUCHER_EXPIRATION | Voucher Expiration
| ELIGIBLE_TOTAL_SPENT | Total spent for eligibility
| ELIGIBLE_INTERVAL_DAY | Interval days for calculating total transactions for eligibility
| ELIGIBLE_MIN_TRX_IN_INTERVAL | How many transaction per interval for eligibility

### Database Setup

- create new database (configurable in env)
- to generate table, just run the app. It will automatically generates table.


### Run Command

`npm start`

### Dependencies
- @nestjs
- axios
- form-data
- moment
- multer
- mysql2
- typeorm