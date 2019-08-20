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

app.post("/api/link", (req, res) => {
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
      url: q.url,
      createTime: new Date().getTime()
    },
    (err, doc) => {
      if (err) {
        console.error(err);
        sendJSON(res, false, { msg: err });
        return;
      }
      console.info("データ作成成功！\n", doc);
      sendJSON(res, true, { id: doc._id }); // idをなぜ返しているの？
    }
  );
});

app.get("/api/getItems", (req, res) => {
  db.find({})
    .sort({ createTime: 1 })
    .exec((err, data) => {
      if (err) {
        sendJSON(res, false, { logs: [], msg: err });
        return;
      }
      console.log("データを送信しました\n", data);
      sendJSON(res, true, { logs: data });
    });
});

function sendJSON(res, result, obj) {
  obj["result"] = result;
  res.json(obj);
}
