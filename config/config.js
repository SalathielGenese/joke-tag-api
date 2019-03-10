const { PG_DB, PG_HOST, PG_USER, PG_PASSWORD } = require( '../src/env' );



module.exports = {
  development: {
    password: PG_PASSWORD,
    dialect: "postgres",
    username: PG_USER,
    database: PG_DB,
    host: PG_HOST,
  },
  test: {
    password: PG_PASSWORD,
    dialect: "postgres",
    username: PG_USER,
    database: PG_DB,
    host: PG_HOST,
  },
  production: {
    password: PG_PASSWORD,
    dialect: "postgres",
    username: PG_USER,
    database: PG_DB,
    host: PG_HOST,
  },
};
