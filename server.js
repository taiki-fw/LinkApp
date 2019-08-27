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

const session = require("express-session");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
app.listen(port, err => {
  if (err) throw new Error(err);
  console.log("サーバーを起動しました", `http://localhost:${port}`);
});
app.use(bodyParser.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

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
    sendJSON(res, true, { logs: data });
  });
});

app.put("/api/editItem", (req, res) => {
  const q = req.body;
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
  users
    .find({
      email: q.email
    })
    .exec((err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      if (bcrypt.compareSync(q.password, data[0].password)) {
        req.session.user_id = data[0].name;
        console.log(req.session);
        sendJSON(res, true, { msg: "userの認証に成功しました" });
      }
    });
});

app.get("/api/logout", (req, res) => {
  console.log(req.session);
  req.session.destroy();
  console.log(req.session);
  sendJSON(res, true, { msg: "ログアウト" });
});

app.get("/api/user/auth", (req, res) => {
  console.log(req.session);
  if (req.session.user_id) {
    sendJSON(res, true, { auth: true, msg: "認証完了" });
  } else {
    sendJSON(res, false, { auth: false, msg: "認証失敗" });
  }
});

function sendJSON(res, result, obj) {
  obj["result"] = result;
  res.json(obj);
}
