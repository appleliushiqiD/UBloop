// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  var { isbn, sortby, type } = event;
  if(sortby=='price'){
    return await db.collection('postBooks').aggregate()
    .match({ isbn: isbn, postType: type }).lookup({
      from:'booksDataBase',
      localField: 'isbn',
      foreignField:	'isbn',
      as: 'bookinfo'
    }).lookup({
      from:'usersDataBase',
      localField: 'openid',
      foreignField:	'openid',
      as: 'userinfo'
    }).sort({ postPrice: 1, postTime: -1 }).end();
  }else if(sortby=='time'){
    return await db.collection('postBooks').aggregate()
    .match({ isbn: isbn, postType: type }).lookup({
      from:'booksDataBase',
      localField: 'isbn',
      foreignField:	'isbn',
      as: 'bookinfo'
    }).lookup({
      from:'usersDataBase',
      localField: 'openid',
      foreignField:	'openid',
      as: 'userinfo'
    }).sort({ postTime: -1, postPrice: 1 }).end();
  }
}