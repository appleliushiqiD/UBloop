// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  var { type } = event;
  // 
  return await db.collection("postBooks").aggregate()
  .match({ postType: type })
  .sortByCount('$isbn').lookup({
    from:'booksDataBase',
    localField: '_id',
    foreignField:	'isbn',
    as: 'bookinfo'
  }).limit(7).end();
}