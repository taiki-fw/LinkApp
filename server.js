const NeDB = require("nedb");
const db = new NeDB({
  filename: __dirname + "/post.db",
  autoload: true
});

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.listen(port, err => {
  if (err) throw new Error(err);
  console.log("サーバーを起動しました", `http://localhost:${port}`);
});

app.use(bodyParser.json());

app.post("/link", (req, res) => {
  const q = req.body;
  console.log(q);
  if (!q) {
    // TODO: errorのstatusを送信して、React側でエラーメッセージを送信する
    console.error("送信されたデータはありません");
    return;
  }
  db.insert(
    {
      title: q.title,
      comment: q.comment,
      url: q.url
    },
    (err, doc) => {
      if (err) {
        console.error(err);
        sendJSON(res, false, { msg: err });
        return;
      }
      sendJSON(res, true, { id: doc._id }); // idをなぜ返しているの？
    }
  );
});

function sendJSON(res, result, obj) {
  obj["result"] = result;
  res.json(obj);
}
