const pg = require("pg");

const connectionString = "postgres://taiki:80210880@localhost:5432/LinkAppNew";

const pool = new pg.Pool({
  connectionString: connectionString
});

module.exports = {
  pool: pool
};
