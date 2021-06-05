//判断是否是学生，显示对应的页面
var json = localStorage.getItem("data");
var jsonObj = JSON.parse(json);
if (jsonObj.type == undefined) {
  $("#nav-left ul").children().eq(1).hide();
  $("#nav-left ul").children().eq(3).hide();
  $("#nav-left ul").children().eq(4).hide();
}

//页眉导航栏显示用户名
if (jsonObj.name) {
  $(".userNamePanel").html(jsonObj.name);
  console.log(jsonObj.name);
} else {
  $(".userNamePanel").html(jsonObj.stuName);
  console.log(jsonObj.stuName);
}

//用户点击退出时，强制登入页面并清空用户数据

$(".exit a").on("click", function () {
  //导向登入页面
  $(location).attr(
    "href",
    "/DormitoryManagementSystemProject/pages/login.html"
  );

  //清空缓存
  localStorage.clear();
});

//警告隐藏

// 点击添加显示页面
$(".add-admin").on("click", function () {
  $("#add-container").show();
  $("#add-admin-type").text("请选择管理员类型");
  $("#add-admin-name").val("");
  $("#add-psw").val("");
  $("#add-admin-account").val("");
  $(".warning").hide();
});

// 点击关闭则关闭页面
$(".close").on("click", function () {
  $("#add-container").hide();
  $("#delete-container").hide();
  $("#modify-container").hide();
});

//删除和和修改的点击事件放进创建函数中，在创建的时候创建监听事件
//否则页面加载完成后不会有点击事件产生
// for (let i = 0; i < $("a").length; i++) {
//   if ($("a").eq(i).html() == "删除") {
//     $("a")
//       .eq(i)
//       .on("click", function () {
//         $("#delete-container").show();
//       });
//   }
// }

// for (let i = 0; i < $("a").length; i++) {
//   if ($("a").eq(i).html() == "修改") {
//     $("a")
//       .eq(i)
//       .on("click", function () {
//         $("#modify-container").show();
//       });
//   }
// }

//点击取消关闭页面
for (let i = 0; i < $(".cancel").length; i++) {
  $(".cancel")
    .eq(i)
    .on("click", function () {
      // console.log("取消按钮点击");
      $("#add-container").hide();
      $("#delete-container").hide();
      $("#modify-container").hide();
    });
}

//dropdown click func
$(function () {
  $(".main-dropdown-menu li a").click(function () {
    $(".dropdown .btn").text($(this).text());
  });
});

//为了便于获取用户数据将此功能进行封装
function getUser() {
  $.ajax({
    url: "/api/admin/getadmin",
    success: function (res) {
      console.log(res);
      if (res.data.length) {
        arr = res.data;
        console.log("arr", arr);
        render();
        createPage();
      }
    },
  });
}

//页面第一次加载时自动调用，获取数据
getUser();

var loginUserArr = [];
loginUserArr.push(jsonObj);

console.log("loginUserArr", loginUserArr);

function render() {
  $("tbody").html("");
  if (jsonObj.type == 2) {
    $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
      $("tbody").append(
        "            <tr data-pass=" +
          v.password +
          '>\
              <th scope="row">' +
          v.id +
          "</th>\
              <td>" +
          v.name +
          "</td>\
              <td>" +
          v.userId +
          "</td>\
              <td>" +
          (v.type == 1 ? "普通管理员" : "超级管理员") +
          '</td>\
              <td><a href="#" >删除</a><a href="#" >修改</a></td>\
            </tr>\
'
      );
    });
  }

  if (jsonObj.type == 1) {
    $(".add-admin").hide();
    $.each(loginUserArr, function (i, v) {
      $("tbody").append(
        "            <tr data-pass=" +
          v.password +
          '>\
              <th scope="row">' +
          v.id +
          "</th>\
              <td>" +
          v.name +
          "</td>\
              <td>" +
          v.userId +
          "</td>\
              <td>" +
          (v.type == 1 ? "普通管理员" : "超级管理员") +
          '</td>\
              <td><a href="#" >修改</a></td>\
            </tr>\
'
      );
    });
  }

  for (let i = 0; i < $("a").length; i++) {
    if ($("a").eq(i).html() == "删除") {
      $("a")
        .eq(i)
        .on("click", function () {
          $("#delete-container").show();
          // console.log("点击删除按钮");
          console.log($(this).parents("tr").children().first().text());
          id = $(this).parents("tr").children().first().text();
        });
    }
  }

  for (let i = 0; i < $("a").length; i++) {
    if ($("a").eq(i).html() == "修改") {
      $("a")
        .eq(i)
        .on("click", function () {
          if (jsonObj.type == 1) {
            $("#modify-admin-type").siblings().children().eq(1).hide();
          }
          $("#modify-container").show();
          //修改点击时将数据内容显示在修改面版上

          $("#modify-admin-id").val(
            $(this).parents("tr").children().first().text()
          );
          $("#modify-admin-name").val(
            $(this).parents("tr").children().eq(1).text()
          );
          $("#modify-admin-account").val(
            $(this).parents("tr").children().eq(2).text()
          );
          $("#modify-admin-pwd").val($(this).parents("tr").attr("data-pass"));
          $("#modify-admin-type").text(
            $(this).parents("tr").children().eq(3).text()
          );
        });
    }
  }
}

//获取管理员列表数据
var arr = []; //存所有的数据;
var count = 10; //一页多少条数据
var page = 1; //当前的页数
var id;
var n;
$.ajax({
  url: "/api/admin/getadmin",
  //   data: {},
  //   type: "",
  success: function (res) {
    console.log(res);
    if (res.data.length) {
      arr = res.data;
      render();
      createPage();
    }
  },
});

//创建管理员界面

function createAdminListPage() {
  $("tbody").html("");
  if (jsonObj.type == 1) {
    $.each(jsonObj, function (i, v) {
      $("tbody").append(
        "            <tr data-pass=" +
          v.password +
          '>\
              <th scope="row">' +
          v.id +
          "</th>\
              <td>" +
          v.name +
          "</td>\
              <td>" +
          v.userId +
          "</td>\
              <td>" +
          (v.type == 1 ? "普通管理员" : "超级管理员") +
          '</td>\
              <td><a href="#" >删除</a><a href="#" >修改</a></td>\
            </tr>\
'
      );
    });
  }

  for (let i = 0; i < $("a").length; i++) {
    if ($("a").eq(i).html() == "删除") {
      $("a")
        .eq(i)
        .on("click", function () {
          $("#delete-container").show();
          // console.log("点击删除按钮");
          console.log($(this).parents("tr").children().first().text());
          id = $(this).parents("tr").children().first().text();
        });
    }
  }

  for (let i = 0; i < $("a").length; i++) {
    if ($("a").eq(i).html() == "修改") {
      $("a")
        .eq(i)
        .on("click", function () {
          $("#modify-container").show();
          //修改点击时将数据内容显示在修改面版上

          $("#modify-admin-id").val(
            $(this).parents("tr").children().first().text()
          );
          $("#modify-admin-name").val(
            $(this).parents("tr").children().eq(1).text()
          );
          $("#modify-admin-account").val(
            $(this).parents("tr").children().eq(2).text()
          );
          $("#modify-admin-pwd").val($(this).parents("tr").attr("data-pass"));
          $("#modify-admin-type").text(
            $(this).parents("tr").children().eq(3).text()
          );
        });
    }
  }
}

//创建页码
function createPage() {
  //arr
  // 1  1
  //5   1
  //6   2
  //10  2
  //每页5个 页面数字获取 = 数组长度 / 每页显示数量 然后向上取整
  //n   arr.length/count  向上取整
  n = Math.ceil(arr.length / count);
  $("#page-switch a").remove();
  for (var i = 1; i <= n; i++) {
    $(".next").before($('<a href="javascript:;">' + i + "</a>"));
  }
}

//子元素有点击事件的时候，将点击事件加给父元素

$("#page-switch").on("click", "a", function () {
  page = $(this).text();
  render();
});

// 点击向前
$(".before").on("click", function () {
  console.log("page", page);
  if (page > 1) {
    page--;
  }
  render();
});

//点击向后
$(".next").on("click", function () {
  console.log("n", n);
  if (page < n) {
    page++;
  }
  render();
});

//用户名为字符串，密码，类型，用户账号均为数字
//添加管理员
$(".add-admin-confirm").on("click", function () {
  //非空判断
  for (var i = 0; i < $("input").length; i++) {
    if (
      $("input").eq(i).val() == "" ||
      $("#add-admin-type").text("请选择管理员类型")
    ) {
      $(".warning").show();
    }
  }

  $.ajax({
    url: "/api/admin/addadmin",
    data: {
      name: $("#add-admin-name").val(),
      password: $("#add-psw").val(),
      type: $(".dropdown .btn").html() == "普通管理员" ? 1 : 2,
      userId: $("#add-admin-account").val(),
    },
    type: "post",
    success: function (res) {
      console.log(res);
      if (res.code == 200) {
        //弹框隐藏
        $("#add-container").hide();
        $(".dropdown .btn").html("请选择管理员类型");
        getUser();
      }
    },
  });
});

//删除管理员
$(".delete-admin-confirm").on("click", function () {
  $.ajax({
    url: "/api/admin/deladmin",
    data: { id: id },
    type: "post",
    success: function (res) {
      $("#delete-container").hide();
      getUser();
      console.log(res);
    },
  });
});

//修改管理员
$(".modify-admin-confirm").on("click", function () {
  $.ajax({
    url: "/api/admin/updateadmin",
    data: {
      id: $("#modify-admin-id").val(),
      name: $("#modify-admin-name").val(),
      password: $("#modify-admin-pwd").val(),
      type: $("#modify-admin-type").html() == "普通管理员" ? 1 : 2,
    },
    type: "post",
    success: function (res) {
      if (res.code == 200) {
        $("#modify-container").hide();
        console.log("修改成功");
        getUser();
      }
    },
  });
});

//面包屑导航事件

//点击获取数据，存在localstorage的nav 数组中

$(".nav-link").each(function (i) {
  $(this).on("click", function () {
    localStorage.setItem($(this).attr("data-name"), $(this).html());
  });
});

//数据去重

function unique(arr) {
  return Array.from(new Set(arr));
}

var navArr = [];
var uniqueArr = unique(navArr);

for (var i = 0; i < uniqueArr.length; i++) {}

var homepage = localStorage.getItem("homepage");
var dorm = localStorage.getItem("dorm");
var student = localStorage.getItem("student");
var bulletin = localStorage.getItem("bulletin");
var admin = localStorage.getItem("admin");

//添加样式
function addCss() {
  $(".menu-list").css({
    height: "25px",
    width: "100px",
    background: "#0f6efd",
    color: "white",
    "text-align": "center",
    "line-height": "25px",
    "border-radius": "3px",
    margin: "10px",
    "font-size": "14px",
  });
  $(".menu-row").css({
    display: "flex",
    " align-items": "center",
    "align-content": "center",
  });
  $(".menu-list a").css({
    "text-decoration": "none",
    color: "white",
    "margin-left": "10px",
  });
}

if (homepage) {
  navArr.push(homepage);
  $(".menu-row").append(
    $(
      '<div class="menu-list">' +
        localStorage.getItem("homepage") +
        '<a href="javascript:;">x</a></div>'
    )
  );
  addCss();
}
if (student) {
  navArr.push(student);
  $(".menu-row").append(
    $(
      '<div class="menu-list">' +
        localStorage.getItem("student") +
        '<a href="javascript:;">x</a></div>'
    )
  );
  addCss();
}
if (bulletin) {
  navArr.push(bulletin);
  $(".menu-row").append(
    $(
      '<div class="menu-list">' +
        localStorage.getItem("bulletin") +
        '<a href="javascript:;">x</a></div>'
    )
  );
  addCss();
}
if (admin) {
  navArr.push(admin);
  $(".menu-row").append(
    $(
      '<div class="menu-list">' +
        localStorage.getItem("admin") +
        '<a href="javascript:;">x</a></div>'
    )
  );
  addCss();
}
if (dorm) {
  navArr.push(dorm);
  $(".menu-row").append(
    $(
      '<div class="menu-list">' +
        localStorage.getItem("dorm") +
        '<a href="javascript:;">x</a></div>'
    )
  );
  addCss();
}

//面包屑点击事件

var navDiv = document.getElementsByClassName("menu-list");

for (var i = 0; i < navDiv.length; i++) {
  navDiv[i].onclick = function () {
    //获得点击数据
    var clickTest = this.firstChild.nodeValue;
    console.log(this.firstChild.nodeValue);
    if (clickTest == "公告主页") {
      console.log("zhelizhelizheli", clickTest);
      localStorage.removeItem("homepage");
      window.history.go(0);
    }
    if (clickTest == "宿舍管理") {
      localStorage.removeItem("dorm");
      window.history.go(0);
    }
    if (clickTest == "学生管理") {
      localStorage.removeItem("student");
      window.history.go(0);
    }
    if (clickTest == "公告管理") {
      localStorage.removeItem("bulletin");
      window.history.go(0);
    }
    if (clickTest == "管理员管理") {
      localStorage.removeItem("admin");
      window.history.go(0);
    }
  };
}

//获得文本内容
// var text = $(this).html();
// console.log("text", text);

//管理员权限，普通管理员只能看到自己，普通管理员显示

//搜索
$(".search").on("click", function () {
  var searchText = $(".adminSearch").val();
  if ($.trim(searchText) != "") {
    $("tbody tr")
      .hide()
      .filter(":contains('" + searchText + "')")
      .show();
  }
});

//重置
$(".reset").on("click", function () {
  $(".adminSearch").val("");
  render();
  createPage();
});
