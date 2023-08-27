// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { openid } = event;
  const { OPENID } = cloud.getWXContext();
  if(openid==''){
    return await db.collection('postBooks').aggregate()
    .match({ openid: OPENID }).lookup({
      from:'booksDataBase',
      localField: 'isbn',
      foreignField:	'isbn',
      as: 'bookinfo'
    }).sort({ postTime: -1 }).end();
  }else{
    return await db.collection('postBooks').aggregate()
    .match({ openid: OPENID }).lookup({
      from:'booksDataBase',
      localField: 'isbn',
      foreignField:	'isbn',
      as: 'bookinfo'
    }).end();
  }
}