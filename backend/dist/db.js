"use strict";

var pg = require("pg");

require("dotenv").config({
  path: "../.env"
});

var env = process.env;
var pool = new pg.Pool({
  host: env.POSTGRE_HOST,
  port: env.POSTGRE_PORT,
  database: env.POSTGRE_DB_NAME,
  user: env.POSTGRE_USER,
  password: env.POSTGRE_PASSWORD
});
module.exports = {
  pool: pool
};