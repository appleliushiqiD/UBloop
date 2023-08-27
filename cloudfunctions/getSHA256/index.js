// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  var signstr = event.signstr;
  var crypto = require("crypto");
  var sha1 = crypto.createHash('sha256');
  sha1.update(new Buffer(signstr, "utf-8"));
  var secret = sha1.digest('hex').toLowerCase();
  return secret;
}