const express = require("express");
const router = express.Router();
var iconv = require("iconv-lite");
const { v1: uuidV1 } = require("uuid");
const fs = require("fs");

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
// 上传图片
router.post("/profile", jsonParser, function (req, res, next) {
  const { userId,coverUrl,type } = req.body;
  if (coverUrl) {
    let base64Data = "";
    let dataBuffer = coverUrl;
    if (Object.prototype.toString.call(coverUrl) === "[object String]") {
      base64Data = coverUrl.replace(/^data:image\/\w+;base64,/, "");
      dataBuffer = new Buffer.from(base64Data, "base64");
    }
    let saveUrl = "./assets/img/" + uuidV1() + ".png";
    fs.writeFile(saveUrl, dataBuffer, (err) => {
      console.log(saveUrl);
      if (err) {
        res.send({
          errno: 1, // 只要不等于 0 就行
          message: err,
        });
      } else {
        // res.send("保存成功！");
        saveUrl = saveUrl.replace("./assets", "");
        if(type){
          let data = loadjson('./data/user.json')
            let index = data.user_list.findIndex(i=>i.id == userId)
          if(type=='avatarUrl'){
            data.user_list[index] = {...data.user_list[index],avatarUrl:"http://47.107.243.60:5005" +saveUrl}
          }
          else if(type == 'backgroundUrl'){
            data.user_list[index] = {...data.user_list[index],backgroundUrl:"http://47.107.243.60:5005" +saveUrl}
          }
          savejson('./data/user.json', data);
        }
        //res.send({coverUrl:'http://47.107.243.60:5003'+saveUrl})
        res.send({
          errno: 0, // 注意：值是数字，不能是字符串
          data: {
            url: "http://47.107.243.60:5005" + saveUrl, // 图片 src ，必须
            alt: "", // 图片描述文字，非必须
            href: "", // 图片的链接，非必须
          },
        });
      }
    });

    return;
  }
  res.send({});
});

// 删除图片
router.post("/delete", jsonParser, function (req, res, next) {
  const { imgarr } = req.body;
  if (imgarr) {
    // let deleteUrl = "./assets/img/" + coverUrl + ".png";
    imgarr.forEach((i) => {
      let deleteUrl = "./assets/img/" + i + ".png";
      fs.unlink(deleteUrl, (error) => {
        if (error) {
          console.log(error);
          return;
        }
      });
    });
    res.send({
      msg: "删除成功",
      code: 200,
    });
    return;
  }
});

module.exports = router;
