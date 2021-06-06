var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var mysql = require("mysql");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//链接数据库
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dromProject2",
});

app.get("/news/getnews", function (req, res) {
  console.log("here we are checknews", req.query);
  // if (req.query.username == "aaa" && req.query.password == "111") {
  //   res.json({ error: 0, msg: "登入成功" });
  // } else {
  //   res.json({ error: 1, msg: "登入失败" });
  // }
  var sql = "select * from news";
  console.log(sql);
  connection.query(sql, function (err, data) {
    console.log(err, data);
    //数据库返回的数据在data里
    if (!err) {
      if (data.length) {
        res.json({ error: 0, msg: "登入成功", data: data });
      } else {
        res.json({ error: 1, msg: "登入失败" });
      }
    }
  });
});

app.listen(3000);
console.log("listening to port 3000");
