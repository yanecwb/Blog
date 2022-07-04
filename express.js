var express = require("express"),
  path = require("path");
var iconv = require("iconv-lite");
// const router = exprss.Router()
var app = express();
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.json({ limit: "50mb" })); //解决413Payload Too Large
const fs = require("fs");
const { v1: uuidV1, v4: uuidv4 } = require("uuid");

var bodyParser = require("body-parser");

// 创建application/json 解析器
var jsonParser = bodyParser.json();

// 创建 application/x-www-form-urlencoded 解析器
var urlencodedParser = bodyParser.urlencoded({ extended: false });
function loadjson(filepath) {
  var data = '';
  try {
    var jsondata = iconv.decode(fs.readFileSync(filepath, "binary"), "utf8");
    data = JSON.parse(jsondata);
  } catch (err) {
    console.log(err);
  }
  return data;
}
function savejson(filepath, data) {
  var datastr = JSON.stringify(data, null, 4);
  if (datastr) {
    try {
      fs.writeFileSync(filepath, datastr);
    } catch (err) {
      console.log(err);
    }
  }
}
// success通用返回信息模板
let message = {
  code: 200,
  msg: "",
};

// Blog账号注册
app.post("/register", jsonParser, function (req, res) {
  // 定义初始化返回信息
  const { username, password } = req.body;
  if (username && password) {
    //读
    var data = loadjson("./data/user.json");
    // 判断是否已有账号
    let has_user = false;
    for (let i = 0; i < data.user_list.length; i++) {
      if (data.user_list[i].username == username) {
        has_user = true;
        break;
      }
    }
    if (has_user) {
      message.msg = "该账号已被注册";
      message.code = 300;
      message.list = null;
      res.send(message);
      return;
    }
    const userDefalut = {
      avatarUrl:'https://img.zcool.cn/community/01b91e5d368512a80120695c617f59.jpg@1280w_1l_2o_100sh.jpg',
      nickname:'无名',
      city:'哪里人🏡',
      sex:'man',
      birthday:'出生日期是👶',
      university:'哪个学校毕业的🏫',
      autograph:'这家伙很懒，还不写点东西🖋️'
    }
    const userObj = {
      id: uuidv4(),
      username,
      password,
      ...userDefalut,
      accountInfo: {
        "lv": 0,
        "blog_years": 0,
        "follows": 0,
        "fans": 0,
        "registerTime":parseInt((new Date().getTime())/1000)
      },
    };

    //修改数据
    data.user_list.push(userObj);
    savejson("./data/user.json", data);
  } else {
    message.msg = "参数错误";
    message.code = 400;
    res.send(message);
    return;
  }
  res.status(200);
  message.code = 200;
  message.msg = "注册成功";
  res.send(message);
});

// Blog账号登陆
app.post("/login", jsonParser, function (req, res) {
  // 定义初始化返回信息
  const { username, password } = req.body;
  //读取
  var data = loadjson("./data/user.json");
  // 判断是否已有账号
  let user = data.user_list.find((item) => {
    return item.username == username;
  });
  if (user && user.password == password) {
    res.status(200);
    message.msg = "登陆成功";
    message.code = 200;
    delete user.password;
    message.userInfo = user;
    res.send(message);
  } else if (user && user.password !== password) {
    message.code = 300;
    message.msg = "密码错误";
    res.send(message);
  } else {
    message.msg = "账号不存在";
    message.code = 400;
    res.send(message);
  }
});

// 修改用户信息
app.post('/changeuserInfo',jsonParser,function(req,res){
  const {userId,changeInfo} = req.body
  try {
    let data = loadjson('./data/user.json')
    let index = data.user_list.findIndex(i=>i.id == userId)
    data.user_list[index] = {...data.user_list[index],...changeInfo}
    savejson('./data/user.json', data);
    res.send({
      code:200,
      msg:'修改成功'
    })
  } catch (error) {
    res.send({
      code:200,
      msg:'修改失败',
      error
    })
  }

})

// 上传文章
app.post("/upload_article", jsonParser, function (req, res) {
  let message = {
    code: 200,
    msg: "",
  };
  const {
    upload_html,
    coverUrl,
    article_classify,
    article_title,
    article_introduction,
    userId,
  } = req.body;
  var file = "./article/" + userId + ".json";
  let userInfo = loadjson("./data/user.json").user_list.filter((item) => {
    return item.id == userId;
  });
  function wirte() {
    var data = loadjson(file);
    const Time = new Date();
    const publish_time = Time.toLocaleDateString() + " " + Time.toTimeString();
    let uper = {
      avatarUrl: userInfo[0].avatarUrl,
      nickname: userInfo[0].nickname,
    };
    data.list.push({
      id: uuidV1(),
      article_classify,
      coverUrl,
      article_title,
      article_introduction,
      content: upload_html,
      publish_time,
      uper,
      userId,
    });
    savejson(file, data);
  }
  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
      fs.writeFileSync(file, '{"list":[]}', function (err) {
        if (err) {
          throw err;
        }
      });
    }
    wirte();
    res.send(message);
  });
});

// 修改文章
app.post("/update_article", jsonParser, function (req, res) {
  let message = {
    code: 200,
    msg: "修改成功",
  };
  const {
    upload_html,
    coverUrl,
    article_classify,
    article_title,
    article_introduction,
    userId,
    article_id,
  } = req.body;
  var file = "./article/" + userId + ".json";
  let articleIndex = loadjson(file).list.findIndex((item) => {
    return item.id == article_id;
  });
  function wirte() {
    var data = loadjson(file);
    data.list.splice(articleIndex, 1, {
      ...data.list[articleIndex],
      content: upload_html,
      article_title,
      article_introduction,
      article_classify,
      coverUrl,
    });
    savejson(file, data);
  }
  wirte();
  res.send(message);
});

// 发表评论
app.put("/put_comment", function (req, res) {
  console.log('发表评论');
  let { uper, article_id, userId, comment } = req.body;
  var file = "./article/" + uper + ".json";
  var data = loadjson(file);
  let article= data.list.find((item) => {
    return item.id == article_id;
  });
  let userInfo = loadjson("./data/user.json").user_list.filter((item) => {
    return item.id == userId;
  });
  // 评论格式化
  comment = {content:comment,commentTime:(new Date()).toLocaleString(),commentId:uuidV1()}
  function wirte() {
    if(article.commenter && article.commenter.length > 0 ){// 该文章评论过
      const userComArrIndex = article.commenter.findIndex(i=>{
        return i.userId == userId
      })
      if(userComArrIndex >= 0){
        article.commenter[userComArrIndex].comment.unshift(comment)
        article.commenter[userComArrIndex].avatarUrl = userInfo[0].avatarUrl
        article.commenter[userComArrIndex].nickname = userInfo[0].nickname
      }else{
        article.commenter.unshift({ comment: [comment], userId:userInfo[0].id, avatarUrl:userInfo[0].avatarUrl, nickname:userInfo[0].nickname })
      }
    }else{
      article.commenter = [{ comment: [comment],userId:userInfo[0].id, avatarUrl:userInfo[0].avatarUrl, nickname:userInfo[0].nickname  }]
    }
    savejson(file, data);
  }
  wirte();
  res.send({ code: 200, msg: "成功" });
});

//获取评论
app.get("/get_comment", function (req, res) {
  console.log('获取评论');
  const { uper, article_id } = req.query;
  var file = "./article/" + uper + ".json";
  let articleIndex = (loadjson(file).list).findIndex((item) => {
    return item.id == article_id;
  });
  var data = loadjson(file);
  const msg = {
    code: 200,
    msg: "成功",
    commenter: data.list[articleIndex].commenter || [],
  };
  res.send(msg);
});
// 删除评论
app.delete("/delete_comment", function (req, res) {
  console.log('删除评论');
  const { uper, article_id, userId,commentId } = req.body;
  var file = "./article/" + uper + ".json"; //文章的发布者
  let data = loadjson(file)
  let article = data.list.find((item) => {
    return item.id == article_id;
  });
  function wirte() {
    const commenter = article.commenter.find(item=>{
      return item.userId == userId
    })
    let deleteindex = commenter.comment.findIndex(item=>{
      return item.commentId == commentId
    })
    commenter.comment.splice(deleteindex, 1)
    savejson(file, data);
  }
  wirte();
  new Promise((resolve) => {
        resolve({ code: 200, msg: "删除成功" });
      }).then((msg) => {
    res.send(msg);
  });
});

// 首页文章列表
app.get("/article_list", function (req, res) {
  let message = {}
  fs.readFile("./data/article_list.json", "utf-8", (err, data) => {
    if (err) return;
    let { current, size } = req.query;
    if (!current || !size) {
      current = 1;
      size = 6;
    }
    data = JSON.parse(data);
    message.total = data.list.length;
    message.list = data.list.splice((current - 1) * 6, Number(size));
    message.msg = "success";
    res.send(message);
  });
});

// 侧边数据
app.get("/side_list", function (req, res) {
  fs.readFile("./data/side_list.json", "utf-8", (err, data) => {
    if (err) return;
    res.send(JSON.parse(data));
  });
});

// 读取某个模块文章列表
app.get("/get_article_moduleList", function (req, res) {
  const { module } = req.query
  let article_moduleList = []
  let data = fs.readdirSync("./article")
  data.forEach((item) => {
    let article = loadjson("./article/" + item)
    article.list.forEach((i) => {
      if (i.article_classify == module) {
        article_moduleList.push(i);
      }
    });
  });
  article_moduleList.reverse();
  res.send({
    code: 200,
    message: "success",
    article_moduleList,
  });
});

// 读指定某条文章内容
app.get("/get_article_content", function (req, res) {
  const { userId, article_id } = req.query;
  const path = "./article/" + userId + ".json";
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) return;
    data = JSON.parse(data);
    try {
      let article_data = {};
      data.list.forEach((item) => {
        if (item.id == article_id) {
          article_data.article_content = item.content;
          article_data.title = item.article_title;
          throw new Error();
        }
      });
    } catch (error) {error}
    let message = {
      code: 200,
      msg: "success",
      // article_content,
    };
    res.send(message);
  });
});

// 上传图片
const img = require("./upload.js");
const { send } = require("process");
app.use("/up", img);

//  POST 请求
app.post("/", function (req, res) {
  console.log("主页 POST 请求");
  res.send("Hello POST");
});

//  /del_user 页面响应
app.get("/del_user", function (req, res) {
  console.log("/del_user 响应 DELETE 请求");
  res.send("删除页面");
});

//  /list_user 页面 GET 请求
app.get("/list_user", function (req, res) {
  console.log("/list_user GET 请求");
  res.send("用户列表页面");
});

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get("/ab*cd", function (req, res) {
  console.log("/ab*cd GET 请求");
  res.send("正则匹配");
});

app.listen(5005, function () {
  console.log("BLOG实例，访问地址为 http://192.168.2.117:5005");
});
