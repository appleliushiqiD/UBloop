// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  var { userinfo } = event;
  userinfo.openid = OPENID;
  var userdata = await db.collection('usersDataBase').where({ openid: OPENID }).get();
  if(userdata.data.length==0){
    //sign
    delete userinfo._id;
    return await db.collection('usersDataBase').add({
      data: userinfo,
    })
  }else{
    //update
    delete userinfo._id
    try{
      return await db.collection('usersDataBase').where({ openid: OPENID }).update({
        data: userinfo,
      })
    }catch(e){
      return e
    }
  }
}