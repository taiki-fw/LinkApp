const pg = require("pg");

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "link",
  user: "link",
  password: "link"
});

module.exports = {
  pool: pool
};
