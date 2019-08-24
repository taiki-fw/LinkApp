const NeDB = require("nedb");
const db = new NeDB({
  filename: __dirname + "/DB/post.db",
  autoload: true
});
const users = new NeDB({
  filename: __dirname + "/DB/users.db",
  autoload: true
});
users.ensureIndex({ fieldName: "email", unique: true }, err => {
  if (err) {
    console.error(err);
    return;
  }
});

const bcrypt = require("bcrypt");
const saltRounds = 10; //ストレッチング回数

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
  db.find({}).exec((err, data) => {
    if (err) {
      sendJSON(res, false, { logs: [], msg: err });
      return;
    }
    console.log("データを送信しました\n", data);
    sendJSON(res, true, { logs: data });
  });
});

app.put("/api/editItem", (req, res) => {
  const q = req.body;
  console.log(q, "送信されました");
  console.log("送信されていません");
  db.update(
    { _id: q.id },
    {
      $set: {
        title: q.title,
        comment: q.comment,
        url: q.url
      }
    },
    {},
    (err, numReplaced) => {
      if (err) {
        console.error(err);
        sendJSON(res, false, { msg: err });
        return;
      }
      console.info(numReplaced, "個のデータが変更されました");
    }
  );
});

app.get("/api/users", (req, res) => {
  users.find({}).exec((err, data) => {
    if (err) {
      sendJSON(res, false, { logs: [], msg: err });
      return;
    }
    console.log("データを送信しました\n", data);
    sendJSON(res, true, { logs: data });
  });
});

app.post("/api/user/registration", (req, res) => {
  const q = req.body;
  if (!q) {
    console.error("データが空です", q);
    return;
  }
  users.insert(
    {
      name: q.name,
      email: q.email,
      password: bcrypt.hashSync(q.password, saltRounds),
      createTime: new Date().getTime()
    },
    (err, doc) => {
      if (err) {
        console.error(err);
        sendJSON(res, false, { msg: err });
        return;
      }
      console.info("ユーザーデータ作成成功！\n", doc);
      sendJSON(res, true, { id: doc._id }); // idをなぜ返しているの？
    }
  );
});

app.post("/api/user/login", (req, res) => {
  const q = req.body;
  if (!q) {
    console.log("データが空です", q);
    return;
  }
  users.find(
    {
      name: q.name,
      password: bcrypt.hashSync(q.password, saltRounds)
    },
    (err, doc) => {
      if (err) {
        console.error(err);
        return;
      }
      req.session.user_id = doc.name;
      sendJSON(res, true, { msg: "userの認証に成功しました" });
    }
  );
});

function sendJSON(res, result, obj) {
  obj["result"] = result;
  res.json(obj);
}
