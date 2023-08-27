// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = event.openid;
  const { OPENID } = cloud.getWXContext();
  if(openid==''){
    var data = await db.collection('usersDataBase').where({ openid: OPENID }).get();
    if(data.data.length==0){
      var data = await db.collection('usersDataBase').doc('e4e53e4164d44879005a0f8350f0ec02').get();
      return { userinfo: data.data, msg: 'noSelf' , OPENID }
    }else{
      return { userinfo: data.data[0], msg: 'self' , OPENID }
    }
  }else{
    var data = await db.collection('usersDataBase').where({ openid: openid }).get();
    if(data.data.length==0){
      var data = await db.collection('usersDataBase').doc('e4e53e4164d44879005a0f8350f0ec02').get();
      return { userinfo: data.data, msg: 'noOther' , openid }
    }else{
      return { userinfo: data.data[0], msg: 'other' }
    }
  }
  
}