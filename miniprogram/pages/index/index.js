import common from "../../utils/common.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSellPosts: [],
    hotBuyPosts: []
  },

  /** 获取热门数据S&B */
  getHotData(){
    wx.cloud.callFunction({
      name: 'getHotBooks',
      data: { type: 'sell' }
    }).then(res=>{
      // console.log(res)
      var { list } = res.result;
      list.forEach((item)=>{
        item.title = common.cutString( item.bookinfo[0].title );
      })
      this.setData({ hotSellPosts: list })
    })
    wx.cloud.callFunction({
      name: 'getHotBooks',
      data: { type: 'buy' }
    }).then(res=>{
      // console.log(res)
      var { list } = res.result;
      list.forEach((item)=>{
        item.title = common.cutString( item.bookinfo[0].title );
      })
      this.setData({ hotBuyPosts: list })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(common)
    this.getHotData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})