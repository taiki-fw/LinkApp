const pg = require("pg");

// dotenvモジュールを利用して.envファイル無いの環境変数を読み込む
require("dotenv").config();

console.log(process.env.POSTGRE_HOST);
console.log(process.env.POSTGRE_PORT);
console.log(process.env.POSTGRE_DB_NAME);
console.log(process.env.POSTGRE_USER);
console.log(process.env.POSTGRE_PASSWORD);

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
