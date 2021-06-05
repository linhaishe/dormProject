//判断是否是学生，显示对应的页面
// var json = localStorage.getItem("data");
// localStorage.setItem("homepage", "公告主页");

// var jsonObj = JSON.parse(json);
// if (jsonObj.type == undefined) {
//   $("#nav-left ul").children().eq(1).hide();
//   $("#nav-left ul").children().eq(3).hide();
//   $("#nav-left ul").children().eq(4).hide();
//   $("#nav-left ul").children().eq(2).find("a").attr("href", "student.html");
// }

// console.log("jsonObj", jsonObj);
// console.log("jsonObj.name", jsonObj.name);
// console.log("jsonObj.stuName", jsonObj.stuName);

// //jsonObj.stuName
// //页眉导航栏显示用户名
// if (jsonObj.name) {
//   $(".userNamePanel").html(jsonObj.name);
//   console.log(jsonObj.name);
// } else {
//   $(".userNamePanel").html(jsonObj.stuName);
//   console.log(jsonObj.stuName);
// }

//导航栏点击事件

$(".nav-link").each(function (i) {
  $(this).on("click", function () {
    if ($(this).attr("data-name") == "homepage") {
      console.log("点击主页");
      $("#homepage").show();
      $("#dorm-homepage").hide();
      $("#student-admin-homepage").hide();
      $("#bulletin-homepage").hide();
      $("#admin-homepage").hide();
    }
    if ($(this).attr("data-name") == "dorm") {
      console.log("点击宿舍管理");
      $("#dorm-homepage").show();
      $("#homepage").hide();
      $("#student-admin-homepage").hide();
      $("#bulletin-homepage").hide();
      $("#admin-homepage").hide();
    }
    if ($(this).attr("data-name") == "student") {
      console.log("学生管理");
      $("#student-admin-homepage").show();
      $("#dorm-homepage").hide();
      $("#homepage").hide();
      $("#bulletin-homepage").hide();
      $("#admin-homepage").hide();
    }
    if ($(this).attr("data-name") == "bulletin") {
      console.log("公告管理");
      $("#bulletin-homepage").show();
      $("#student-admin-homepage").hide();
      $("#dorm-homepage").hide();
      $("#homepage").hide();
      $("#admin-homepage").hide();
    }
    if ($(this).attr("data-name") == "admin") {
      console.log("管理员页面");
      $("#admin-homepage").show();
      $("#bulletin-homepage").hide();
      $("#student-admin-homepage").hide();
      $("#dorm-homepage").hide();
      $("#homepage").hide();
    }
  });
});

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

var arr = []; //存所有的数据;
var count = 5; //一页多少条数据
var page = 1; //当前的页数
var n;

//登入成功提示框
$(document).ready(function () {
  $("#login-success").fadeIn(500, function () {
    $(this).fadeOut(1000);
  });
});

$.ajax({
  url: "/api/notice/getnotice",
  success: function (res) {
    //获取数据成功后

    if (res.data.length) {
      //变成数组对象 [{},{},...]
      //将数据的内容存放到数组中，方便获取和遍历
      arr = res.data;
      console.log(res);
      console.log("arr", arr);

      //创建公告页面
      createBulletin();

      //创建page页面
      createPage();
    }
  },
});

//获得公告内容，将内容渲染到html中

function createBulletin() {
  // 1  0-4，第一页，第一条到第五条，index 0-4
  // 2  5-9
  // 3  10-14
  // 4  15-19
  // n  (n-1)*5 -  5*n

  //每次调用后先清空页面
  $(".list-group").html("");

  //遍历arr中的数据添加到节点中，并渲染
  //function中的参数 i,v 的顺序不能变
  //遍历中都有i,v,记得复习
  $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
    $(".list-group").append(
      '  <a href="#" class="list-group-item list-group-item-action">\
          <div class="d-flex w-100 justify-content-between">\
            <h5 class="mb-1">' +
        v.title +
        "</h5>\
            <small>" +
        v.mytime +
        '</small>\
          </div>\
          <p class="mb-1">' +
        v.content +
        "</p>\
        </a>\
"
    );
  });
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

  for (var i = 1; i <= n; i++) {
    $(".next").before($('<a href="javascript:;">' + i + "</a>"));
  }
}

//子元素有点击事件的时候，将点击事件加给父元素

$("#page-switch").on("click", "a", function () {
  page = $(this).text();
  createBulletin();
});

// 点击向前
$(".before").on("click", function () {
  console.log("page", page);
  if (page > 1) {
    page--;
  }
  createBulletin();
});

//点击向后
$(".next").on("click", function () {
  console.log("n", n);
  if (page < n) {
    page++;
  }
  createBulletin();
});

//面包屑导航事件

//点击获取数据，存在localstorage的nav 数组中

// $(".nav-link").each(function (i) {
//   $(this).on("click", function () {
//     localStorage.setItem($(this).attr("data-name"), $(this).html());
//   });
// });

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
