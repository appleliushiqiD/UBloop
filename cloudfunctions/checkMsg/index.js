// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  var { content, type } = event
  var result = await cloud.openapi.security.msgSecCheck({
    "openid": OPENID,
    "scene": type,
    "version": 2,
    "content": content
  })
  result.openid = OPENID;
  return result;
}