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

const postgre = require("./DB/db.js").pool;

// パスワードの暗号化
const bcrypt = require("bcrypt");
const saltRounds = 10; //ストレッチング回数

// API
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
app.listen(port, err => {
  if (err) throw new Error(err);
  console.log("サーバーを起動しました", `http://localhost:${port}`);
});
app.use(bodyParser.json());
// セッション
const session = require("express-session");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

// 時刻を日付に変更する関数
function get_date(_timestamp) {
  var _d = _timestamp ? new Date(_timestamp * 1000) : new Date();

  var Y = _d.getFullYear();
  var m = ("0" + (_d.getMonth() + 1)).slice(-2);
  var d = ("0" + _d.getDate()).slice(-2);
  var H = ("0" + _d.getHours()).slice(-2);
  var i = ("0" + _d.getMinutes()).slice(-2);
  var s = ("0" + _d.getSeconds()).slice(-2);

  return Y + "/" + m + "/" + d + " " + H + ":" + i + ":" + s;
}

app.post("/api/link", (req, res) => {
  const q = req.body;
  console.log(q);
  if (!q) {
    // TODO: errorのstatusを送信して、React側でエラーメッセージを送信する
    console.error("送信されたデータはありません");
    return;
  }
  const title = q.title;
  const comment = q.comment;
  const url = q.url;
  const create_at = get_date();
  const updated_at = create_at;
  const qstr =
    "INSERT INTO cards (user_id, title, comment, url, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)";
  postgre
    .query(qstr, [
      req.session.user_id,
      title,
      comment,
      url,
      create_at,
      updated_at
    ])
    .then(result => {
      console.info("データ作成成功！\n", result);
      sendJSON(res, true, { msg: "投稿に成功しました" });
    })
    .catch(err => {
      console.error(err);
      sendJSON(res, false, { msg: "投稿に失敗しました" });
    });
  // db.insert(
  //   {
  //     title: q.title,
  //     comment: q.comment,
  //     url: q.url,
  //     createTime: new Date().getTime()
  //   },
  //   (err, doc) => {
  //     if (err) {
  //       console.error(err);
  //       sendJSON(res, false, { msg: err });
  //       return;
  //     }
  //     console.info("データ作成成功！\n", doc);
  //     sendJSON(res, true, { id: doc._id }); // idをなぜ返しているの？
  //   }
  // );
});

app.get("/api/getItems", (req, res) => {
  const qstr = "SELECT * FROM cards where user_id = $1";
  postgre
    .query(qstr, [req.session.user_id])
    .then(result => {
      console.log("以下のLinkデータを送信します\n", result.rows);
      sendJSON(res, true, { logs: result.rows });
    })
    .catch(err => {
      console.error(err);
      sendJSON(res, false, { logs: [], msg: err });
    });
  // db.find({}).exec((err, data) => {
  //   if (err) {
  //     sendJSON(res, false, { logs: [], msg: err });
  //     return;
  //   }
  //   sendJSON(res, true, { logs: data });
  // });
});

app.put("/api/editItem", (req, res) => {
  const q = req.body;
  const title = q.title;
  const comment = q.comment;
  const url = q.url;
  const updated_at = get_date();
  const qstr =
    "UPDATE cards SET title = $1, comment = $2, url = $3, updated_at = $4 WHERE id = $5 ";
  postgre
    .query(qstr, [title, comment, url, updated_at, q.id])
    .then(result => {
      console.log("更新完了\n", result);
    })
    .catch(err => {
      console.error(err);
    });
  // db.update(
  //   { _id: q.id },
  //   {
  //     $set: {
  //       title: q.title,
  //       comment: q.comment,
  //       url: q.url
  //     }
  //   },
  //   {},
  //   (err, numReplaced) => {
  //     if (err) {
  //       console.error(err);
  //       sendJSON(res, false, { msg: err });
  //       return;
  //     }
  //   }
  // );
});

app.delete("/api/deleteItem", (req, res) => {
  const q = req.body;
  const user_id = req.session.user_id;
  const card_id = q.id;
  const qstr = "DELETE FROM cards WHERE user_id = $1 and id = $2";
  postgre
    .query(qstr, [user_id, card_id])
    .then(result => {
      console.log("データ削除に成功しました\n", result);
      sendJSON(res, true, { msg: "データ削除しました。" });
    })
    .catch(err => {
      console.error("データ削除に失敗\n", errr);
      sendJSON(res, false, { msg: "データ削除出来ませんでした。" });
    });
});

app.get("/api/users", (req, res) => {
  // users.find({}).exec((err, data) => {
  //   if (err) {
  //     sendJSON(res, false, { logs: [], msg: err });
  //     return;
  //   }
  //   console.log("データを送信しました\n", data);
  //   sendJSON(res, true, { logs: data });
  // });
  postgre
    .query("SELECT * FROM users")
    .then(result => {
      sendJSON(res, true, { logs: result.rows });
    })
    .catch(err => {
      sendJSON(res, false, { logs: [] });
    });
});

app.post("/api/user/registration", (req, res) => {
  const q = req.body;
  if (!q) {
    console.error("データが空です", q);
    return;
  }
  const name = q.name;
  const email = q.email;
  const password = bcrypt.hashSync(q.password, saltRounds);
  const qstr =
    "insert into users (userid, email, password) values($1, $2, $3);";
  postgre
    .query(qstr, [name, email, password])
    .then(result => {
      console.log("Success\n", result);
      if (result.rows) {
        console.log(result.rows);
        sendJSON(res, true, {});
      }
    })
    .catch(error => {
      console.error(error);
    });
  // users.insert(
  //   {
  //     name: q.name,
  //     email: q.email,
  //     password: bcrypt.hashSync(q.password, saltRounds),
  //     createTime: new Date().getTime()
  //   },
  //   (err, doc) => {
  //     if (err) {
  //       console.error(err);
  //       sendJSON(res, false, { msg: err });
  //       return;
  //     }
  //     console.info("ユーザーデータ作成成功！\n", doc);
  //     sendJSON(res, true, { id: doc._id }); // idをなぜ返しているの？
  //   }
  // );
});

app.post("/api/user/login", (req, res) => {
  const q = req.body;
  if (!q) {
    console.log("データが空です", q);
    return;
  }
  const qstr = "SELECT * FROM users WHERE email = $1";
  postgre
    .query(qstr, [q.email])
    .then(result => {
      console.log(result);
      const account = result.rows[0];
      if (bcrypt.compareSync(q.password, account.password)) {
        req.session.user_id = account.userid;
        sendJSON(res, true, { msg: "userの認証に成功しました" });
      }
    })
    .catch(err => {
      console.error(err);
      sendJSON(res, false, { msg: "userの認証に失敗しました" });
    });
  // users
  //   .find({
  //     email: q.email
  //   })
  //   .exec((err, data) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     if (bcrypt.compareSync(q.password, data[0].password)) {
  //       req.session.user_id = data[0].name;
  //       console.log(req.session);
  //       sendJSON(res, true, { msg: "userの認証に成功しました" });
  //     }
  //   });
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
