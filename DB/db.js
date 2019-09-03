const pg = require("pg");

const connectionString = "postgres://taiki:80210880@localhost:5432/LinkAppNew";

const pool = new pg.Pool({
  connectionString: connectionString
});

module.exports = {
  pool: pool
};

// SELECT してみる
// pool
//   .query("SELECT * FROM test_table")
//   .then(result => {
//     console.log("Success", result);
//     // 結果データの表示
//     if (result.rows) {
//       result.rows.forEach((row, index) => {
//         console.log(index + 1, row);
//       });
//     }
//   })
//   .catch(error => {
//     console.log("Failure", error);
//   })
//   .then(() => {
//     console.log("切断");
//     pool.end();
//   });
