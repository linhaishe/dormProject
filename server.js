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
//登入页面查询
app.get("/login/getuser", function (req, res) {
  console.log("登入查询", req.query);
  if (req.query.type == "管理员") {
    console.log("管理员登入了");
    var sql =
      "select * from admins where adminId = " +
      req.query.username +
      " and adminPwd =" +
      req.query.password +
      "";
    connection.query(sql, function (err, data) {
      //数据库返回的数据在data里
      if (!err) {
        if (data.length) {
          res.json({ error: 0, msg: "登入成功", data: data });
        } else {
          res.json({ error: 1, msg: "登入失败" });
        }
      }
    });
  } else {
    console.log("学生登入了");
    var sql =
      "select * from students where stuId = " +
      req.query.username +
      " and stuPwd =" +
      req.query.password +
      "";
    connection.query(sql, function (err, data) {
      //数据库返回的数据在data里
      if (!err) {
        if (data.length) {
          res.json({ error: 0, msg: "登入成功", data: data });
        } else {
          res.json({ error: 1, msg: "登入失败" });
        }
      }
    });
  }
});

//主页面信息查询

//公告页面数据库查询
app.get("/news/getnews", function (req, res) {
  console.log("here we are checknews", req.query);
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

//宿舍信息渲染

app.get("/dorm/getdorms", function (req, res) {
  console.log("here we are checkdorms", req.query);
  var sql = "select * from dorms";
  console.log(sql);
  connection.query(sql, function (err, data) {
    console.log(err, data);
    //数据库返回的数据在data里
    if (!err) {
      if (data.length) {
        res.json({ error: 0, msg: "查询成功", data: data });
      } else {
        res.json({ error: 1, msg: "查询失败" });
      }
    }
  });
});

//学生信息渲染
app.get("/student/getstudent", function (req, res) {
  console.log("here we are checkstudents", req.query);
  var sql =
    "select * from students left join dorms on students.stuDormId = dorms.id";
  console.log(sql);
  connection.query(sql, function (err, data) {
    console.log(err, data);
    //数据库返回的数据在data里
    if (!err) {
      if (data.length) {
        res.json({ error: 0, msg: "查询成功", data: data });
      } else {
        res.json({ error: 1, msg: "查询失败" });
      }
    }
  });
});

//公告管理信息渲染
app.get("/news/getnews", function (req, res) {
  console.log("here we are checkstudents", req.query);
  var sql = "select * from news";
  console.log(sql);
  connection.query(sql, function (err, data) {
    console.log(err, data);
    //数据库返回的数据在data里
    if (!err) {
      if (data.length) {
        res.json({ error: 0, msg: "查询成功", data: data });
      } else {
        res.json({ error: 1, msg: "查询失败" });
      }
    }
  });
});

//管理员信息渲染
app.get("/admins/getadmin", function (req, res) {
  console.log("here we are checkstudents", req.query);
  var sql = "select * from admins";
  console.log(sql);
  connection.query(sql, function (err, data) {
    console.log(err, data);
    //数据库返回的数据在data里
    if (!err) {
      if (data.length) {
        res.json({ error: 0, msg: "查询成功", data: data });
      } else {
        res.json({ error: 1, msg: "查询失败" });
      }
    }
  });
});

//宿舍添加
app.post("/dorm/adddorm", function (req, res) {
  console.log("添加宿舍", req.body);
  var insertSql =
    "insert into dorms values (null," +
    req.body.balance +
    "," +
    req.body.dormId +
    "," +
    req.body.dormName +
    ",default,default)";

  var insertSql2 =
    "insert into dorms values (null," +
    req.body.balance +
    "," +
    req.body.dormId +
    ',"' +
    req.body.dormName +
    '",default,default)';
  console.log(insertSql2);
  connection.query(insertSql2, function (err, data) {
    console.log(err, data);
    //数据库返回的数据在data里
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "添加成功", data: data });
      } else {
        res.json({ error: 1, msg: "添加失败" });
      }
    }
  });
});

app.listen(3000);
console.log("listening to port 3000");
