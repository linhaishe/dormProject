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
    "select students.id,students.stuId,students.stuName,students.stuUserId,students.stuDormId,students.stupwd,dorms.balance,dorms.dormId,dorms.dormName,dorms.peopleNum,dorms.dormType from students left join dorms on students.stuDormId = dorms.id";

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

//宿舍删除
//宿舍有人不能删除，因为外键的原因
app.post("/dorm/deldorm", function (req, res) {
  var delSql = "DELETE FROM dorms WHERE id = " + req.body.dormId + "";
  console.log("delSql", delSql);
  connection.query(delSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "删除成功", data: data });
      } else {
        res.json({ error: 1, msg: "删除失败" });
      }
    }
  });
});

//宿舍修改
app.post("/dorm/updatedorm", function (req, res) {
  var updateSql =
    "UPDATE dorms SET dormName = '" +
    req.body.dormName +
    "', balance = " +
    req.body.balance +
    " WHERE id = " +
    req.body.id +
    "";
  console.log("updateSql", updateSql);
  connection.query(updateSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "宿舍修改成功", data: data });
      } else {
        res.json({ error: 1, msg: "宿舍修改失败" });
      }
    }
  });
});

//宿舍催费状态修改
app.post("/dorm/deptdorm", function (req, res) {
  var updateSql =
    "UPDATE dorms SET dormType = " +
    req.body.type +
    " where id = " +
    req.body.id +
    "";
  console.log("updateSql", updateSql);
  connection.query(updateSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "宿舍状态修改成功", data: data });
      } else {
        res.json({ error: 1, msg: "宿舍状态修改失败" });
      }
    }
  });
});

//学生添加
app.post("/students/addstudent", function (req, res) {
  var updateSql =
    "insert into students values (null," +
    req.body.stuId +
    ",'" +
    req.body.stuName +
    "'," +
    req.body.stuUserId +
    "," +
    req.body.stuDormId +
    "," +
    req.body.stuPas +
    ")";

  console.log("sql", updateSql);
  connection.query(updateSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "学生添加成功", data: data });
      } else {
        res.json({ error: 1, msg: "学生添加失败" });
      }
    }
  });
});

//学生删除
app.post("/students/delstudent", function (req, res) {
  var delSql = "DELETE FROM students WHERE id = " + req.body.id + "";
  console.log("delSql", delSql);
  connection.query(delSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "学生删除成功", data: data });
      } else {
        res.json({ error: 1, msg: "学生删除失败" });
      }
    }
  });
});

//学生修改
app.post("/students/updatestudent", function (req, res) {
  var updateSql =
    'update students set stuName = "' +
    req.body.stuName +
    '" , stuPwd = ' +
    req.body.stuPas +
    ", stuDormId = " +
    req.body.stuDormId +
    "  where id = " +
    req.body.id +
    "";

  console.log("updateSql", updateSql);
  connection.query(updateSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "学生修改成功", data: data });
      } else {
        res.json({ error: 1, msg: "学生修改失败" });
      }
    }
  });
});

//公告添加
app.post("/news/addnews", function (req, res) {
  var insertSql =
    "insert into news values (null," +
    req.body.adminId +
    ',"' +
    req.body.adminName +
    '","' +
    req.body.title +
    '","' +
    req.body.content +
    '",now())';

  connection.query(insertSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "公告添加成功", data: data });
      } else {
        res.json({ error: 1, msg: "公告添加失败" });
      }
    }
  });
});

//公告删除
app.post("/news/delNews", function (req, res) {
  var delSql = "delete from news where id = " + req.body.id + "";
  connection.query(delSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "公告删除成功", data: data });
      } else {
        res.json({ error: 1, msg: "公告删除失败" });
      }
    }
  });
});

//公告修改
app.post("/news/updateNews", function (req, res) {
  var updateSql =
    'update news set title="' +
    req.body.title +
    '",content="' +
    req.body.content +
    '" where id = ' +
    req.body.id +
    "";
  connection.query(updateSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "公告修改成功", data: data });
      } else {
        res.json({ error: 1, msg: "公告修改失败" });
      }
    }
  });
});

//添加管理员
app.post("/admin/addadmin", function (req, res) {
  var insertSql =
    "insert into admins values(null," +
    req.body.userId +
    ',"' +
    req.body.name +
    '",' +
    req.body.password +
    "," +
    req.body.type +
    ");";

  connection.query(insertSql, function (err, data) {
    console.log("管理员添加sql", insertSql);
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "管理员添加成功", data: data });
      } else {
        res.json({ error: 1, msg: "管理员添加失败" });
      }
    }
  });
});

//删除管理员
app.post("/admin/deladmin", function (req, res) {
  var delSql = "delete from admins where id = " + req.body.id + "";
  connection.query(delSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "管理员删除成功", data: data });
      } else {
        res.json({ error: 1, msg: "管理员删除失败" });
      }
    }
  });
});

//修改管理员
app.post("/admin/updateadmin", function (req, res) {
  var updateSql =
    'update admins set adminName="' +
    req.body.name +
    '",adminPwd=' +
    req.body.password +
    ",adminType=" +
    req.body.type +
    " where id=" +
    req.body.id +
    "";

  connection.query(updateSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "管理员修改成功", data: data });
      } else {
        res.json({ error: 1, msg: "管理员修改失败" });
      }
    }
  });
});

app.listen(3000);
console.log("listening to port 3000");
