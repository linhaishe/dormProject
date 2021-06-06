// //判断是否是学生，显示对应的页面
// var json = localStorage.getItem("data");
// var jsonObj = JSON.parse(json);
// if (jsonObj.type == undefined) {
//   $("#nav-left ul").children().eq(1).hide();
//   $("#nav-left ul").children().eq(3).hide();
//   $("#nav-left ul").children().eq(4).hide();
// }

// //页眉导航栏显示用户名
// if (jsonObj.name) {
//   $(".userNamePanel").html(jsonObj.name);
//   console.log(jsonObj.name);
// } else {
//   $(".userNamePanel").html(jsonObj.stuName);
//   console.log(jsonObj.stuName);
// }

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

//添加宿舍点击事件
$(".add-dorm").on("click", function () {
  $("#add-container").show();
  $(".warning").hide();
});

$(".close").on("click", function () {
  $("#add-container").hide();
  $("#delete-container").hide();
  $("#modify-container").hide();
  $("#getFee-container").hide();
});

for (let i = 0; i < $(".cancel").length; i++) {
  $(".cancel")
    .eq(i)
    .on("click", function () {
      $("#add-container").hide();
      $("#delete-container").hide();
      $("#modify-container").hide();
      $("#getFee-container").hide();
    });
}

for (let i = 0; i < $("a").length; i++) {
  var clickText = $("a").eq(i).attr("class");
  switch (clickText) {
    case "delDorm":
      $("a")
        .eq(i)
        .on("click", function () {
          $("#delete-container").show();
          // id = $(this).parents("tr").attr("data-id");
          // type = console.log(id);
        });
      break;
    case "dormUpdate":
      $("a")
        .eq(i)
        .on("click", function () {
          $("#modify-container").show();
          // id = $(this).parents("tr").attr("data-id");
          // type = console.log(id);
        });
      break;
  }
}

//改为正常，发起催款
for (let i = 0; i < $("a").length; i++) {
  if ($("a").eq(i).html() == "改为正常") {
    $("a")
      .eq(i)
      .on("click", function () {
        $("#getFee-container").show();
        id = $(this).parents("tr").attr("data-id");
        type = $(this).parents("tr").children().eq(4).text();
        console.log(id);
        console.log(type);
      });
  }
}
for (let i = 0; i < $("a").length; i++) {
  if ($("a").eq(i).html() == "发起催款") {
    $("a")
      .eq(i)
      .on("click", function () {
        $("#getFee-container").show();
        id = $(this).parents("tr").attr("data-id");
        type = $(this).parents("tr").children().eq(4).text();
        console.log(id);
        console.log(type);
      });
  }
}

//获取宿舍页面
var arr = []; //存所有的数据;
var count = 10; //一页多少条数据
var page = 1; //当前的页数
var id;
var n;
var type;

function getUser() {
  $.ajax({
    url: "/api/dorm/getdorm",
    //   data: {},
    //   type: "",
    success: function (res) {
      console.log(res);
      if (res.data.length) {
        arr = res.data;
        console.log("jsonObj", jsonObj);
        render();
        createPage();
      }
    },
  });
}

getUser();

//主页所有信息渲染
function render() {
  $("tbody").html("");
  $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
    $("tbody").append(
      "            <tr data-id=" +
        v.id +
        '>\
              <th scope="row">' +
        v.dormId +
        "</th>\
              <td>" +
        v.dormName +
        "</td>\
              <td>" +
        v.num +
        "</td>\
              <td>" +
        v.balance +
        "</td>\
              <td>" +
        (v.type == 1 ? "正常" : "催缴中") +
        '</td>\
              <td>\
                <a href="#">删除</a><a href="#">修改</a\
                ><a href="#">' +
        (v.type == 1 ? "发起催款" : "改为正常") +
        "</a>\
              </td>\
            </tr>\
"
    );
  });

  // for (let i = 0; i < $("a").length; i++) {
  //   if ($("a").eq(i).html() == "删除") {
  //     $("a")
  //       .eq(i)
  //       .on("click", function () {
  //         $("#delete-container").show();
  //         id = $(this).parents("tr").attr("data-id");
  //         type = console.log(id);
  //       });
  //   }
  // }

  // for (let i = 0; i < $("a").length; i++) {
  //   if ($("a").eq(i).html() == "修改") {
  //     $("a")
  //       .eq(i)
  //       .on("click", function () {
  //         $("#modify-container").show();
  //         $("#modify-dormId").val(
  //           $(this).parents("tr").children().first().text()
  //         );
  //         $("#modify-dormName").val(
  //           $(this).parents("tr").children().eq(1).text()
  //         );
  //         $("#numOfPeople").val($(this).parents("tr").children().eq(2).text());
  //         $("#chargefee").val($(this).parents("tr").children().eq(3).text());
  //         id = $(this).parents("tr").attr("data-id");
  //         type = $(this).parents("tr").children().eq(4).text();
  //       });
  //   }
  // }

  // for (let i = 0; i < $("a").length; i++) {
  //   if ($("a").eq(i).html() == "改为正常") {
  //     $("a")
  //       .eq(i)
  //       .on("click", function () {
  //         $("#getFee-container").show();
  //         id = $(this).parents("tr").attr("data-id");
  //         type = $(this).parents("tr").children().eq(4).text();
  //         console.log(id);
  //         console.log(type);
  //       });
  //   }
  // }
  // for (let i = 0; i < $("a").length; i++) {
  //   if ($("a").eq(i).html() == "发起催款") {
  //     $("a")
  //       .eq(i)
  //       .on("click", function () {
  //         $("#getFee-container").show();
  //         id = $(this).parents("tr").attr("data-id");
  //         type = $(this).parents("tr").children().eq(4).text();
  //         console.log(id);
  //         console.log(type);
  //       });
  //   }
  // }
}

//创建页码
function createPage() {
  n = Math.ceil(arr.length / count);
  $("#page-switch a").remove();
  for (var i = 1; i <= n; i++) {
    $(".next").before($('<a href="javascript:;">' + i + "</a>"));
  }
}

$("#page-switch").on("click", "a", function () {
  // $("#page-switch a").remove();
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

//添加宿舍
$(".add-dorm-confirm").on("click", function () {
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
    url: "/api/dorm/adddorm",
    data: {
      balance: $("#bill").val(),
      dormId: $("#dormId").val(),
      dormName: $("#dormName").val(),
    },
    type: "post",
    success: function (res) {
      console.log(res);
      if (res.code == 200) {
        //弹框隐藏
        $("#add-container").hide();
        getUser();
        $("#bill").val("");
        $("#dormId").val("");
        $("#dormName").val("");
        console.log("添加成功");
      }
    },
  });
});

//删除宿舍
$(".delete-dorm-confirm").on("click", function () {
  $.ajax({
    url: "/api/dorm/deldorm",
    //这里的dormId是主键id,不是数组里的dormId
    data: { dormId: id },
    type: "post",
    success: function (res) {
      $("#delete-container").hide();
      getUser();
      console.log(res);
    },
  });
});

//修改宿舍
$(".modify-dorm-confirm").on("click", function () {
  $.ajax({
    url: "/api/dorm/updatedorm",
    data: {
      balance: $("#chargefee").val(),
      dormId: $("#modify-dormId").val(),
      dormName: $("#modify-dormName").val(),
      id: id,
      num: $("#numOfPeople").val(),
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

//修改为正常状态
$(".push-get-fee").on("click", function () {
  $.ajax({
    url: "/api/dorm/deptdorm",
    data: { id: id, type: type == "正常" ? 2 : 1 },
    type: "post",
    success: function (res) {
      $("#getFee-container").hide();
      getUser();
      console.log("修改状态成功");
    },
  });
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
// function addCss() {
//   $(".menu-list").css({
//     height: "25px",
//     width: "100px",
//     background: "#0f6efd",
//     color: "white",
//     "text-align": "center",
//     "line-height": "25px",
//     "border-radius": "3px",
//     margin: "10px",
//     "font-size": "14px",
//   });
//   $(".menu-row").css({
//     display: "flex",
//     " align-items": "center",
//     "align-content": "center",
//   });
//   $(".menu-list a").css({
//     "text-decoration": "none",
//     color: "white",
//     "margin-left": "10px",
//   });
// }

// if (homepage) {
//   navArr.push(homepage);
//   $(".menu-row").append(
//     $(
//       '<div class="menu-list">' +
//         localStorage.getItem("homepage") +
//         '<a href="javascript:;">x</a></div>'
//     )
//   );
//   addCss();
// }
// if (student) {
//   navArr.push(student);
//   $(".menu-row").append(
//     $(
//       '<div class="menu-list">' +
//         localStorage.getItem("student") +
//         '<a href="javascript:;">x</a></div>'
//     )
//   );
//   addCss();
// }
// if (bulletin) {
//   navArr.push(bulletin);
//   $(".menu-row").append(
//     $(
//       '<div class="menu-list">' +
//         localStorage.getItem("bulletin") +
//         '<a href="javascript:;">x</a></div>'
//     )
//   );
//   addCss();
// }
// if (admin) {
//   navArr.push(admin);
//   $(".menu-row").append(
//     $(
//       '<div class="menu-list">' +
//         localStorage.getItem("admin") +
//         '<a href="javascript:;">x</a></div>'
//     )
//   );
//   addCss();
// }
// if (dorm) {
//   navArr.push(dorm);
//   $(".menu-row").append(
//     $(
//       '<div class="menu-list">' +
//         localStorage.getItem("dorm") +
//         '<a href="javascript:;">x</a></div>'
//     )
//   );
//   addCss();
// }

// //面包屑点击事件

// var navDiv = document.getElementsByClassName("menu-list");

// for (var i = 0; i < navDiv.length; i++) {
//   navDiv[i].onclick = function () {
//     //获得点击数据
//     var clickTest = this.firstChild.nodeValue;
//     console.log(this.firstChild.nodeValue);
//     if (clickTest == "公告主页") {
//       console.log("zhelizhelizheli", clickTest);
//       localStorage.removeItem("homepage");
//       window.history.go(0);
//     }
//     if (clickTest == "宿舍管理") {
//       localStorage.removeItem("dorm");
//       window.history.go(0);
//     }
//     if (clickTest == "学生管理") {
//       localStorage.removeItem("student");
//       window.history.go(0);
//     }
//     if (clickTest == "公告管理") {
//       localStorage.removeItem("bulletin");
//       window.history.go(0);
//     }
//     if (clickTest == "管理员管理") {
//       localStorage.removeItem("admin");
//       window.history.go(0);
//     }
//   };
// }
