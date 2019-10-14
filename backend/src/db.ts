// const pg = require("pg");
import * as pg from "pg";
require("dotenv").config({ path: "../.env" });
const env = process.env;

const pool = new pg.Pool({
  host: env.POSTGRE_HOST,
  port: parseInt(env.POSTGRE_PORT),
  database: env.POSTGRE_DB_NAME,
  user: env.POSTGRE_USER,
  password: env.POSTGRE_PASSWORD
});

export default pool;
