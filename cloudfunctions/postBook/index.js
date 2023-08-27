// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  var { type, postinfo } = event;
  postinfo.postPrice = Number(postinfo.postPrice);
  postinfo.openid = OPENID;
  if(type=='add'){
    return await db.collection('postBooks').add({ data:postinfo });
  }else if(type=='update'){
    var _id = postinfo._id;
    delete postinfo._id
    return await db.collection('postBooks').doc(_id).update({ data: postinfo });
  }else if(type=='delete'){
    return await db.collection('postBooks').doc(postinfo._id).remove();
  }
}