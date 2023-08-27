// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  var { avatarurl } = event
  var checkMsg = await cloud.openapi.security.mediaCheckAsync({
    media_url: avatarurl,
    media_type: 2,
    version: 2,
    scene: 1,
    openid: OPENID
  })
  return checkMsg
}