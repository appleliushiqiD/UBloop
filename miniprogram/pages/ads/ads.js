// pages/ads/ads.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ads:{
      title:"线下交易会",
      picUrl:"cloud://cloud1-4g5g6kjfdf33b9c3.636c-cloud1-4g5g6kjfdf33b9c3-1319303691/ads/activation2Raw.jpg",
      richText:'<h4>活动时间：2023年7月3-4日</h4><h4>活动内容</h4><ul><li>力推的线下书籍交易活动，集中解决大家的二手书交易需求</li><li>在小程序中有出售和欲购的用户可以在活动详情链接（暂未开放）中提交线下活动的资料</li></ul><h4>注意事项</h4><ul><li>请自觉参与维护组织活动的秩序与环境，营造良好的交易氛围</li><li>在线下活动中，请及时更新个人的发布内容，以便其他用户更及时找到交易对象</li><li>请不要发布虚假信息，用户有权对参与活动的用户进行评价，评价会展示在个人信息中，便于用户后期活动的交易信用分析</li><li>请就评价部分认真参考隐私部分的说明，请再三考虑做出评判，以免对他人造成影响</li></ul>'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title:this.data.ads.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})