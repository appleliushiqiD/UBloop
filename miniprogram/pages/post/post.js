import common from "../../utils/common.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myPosteds: [],
    ads:{
      title:"线下交易会",
      picUrl:"cloud://cloud1-4g5g6kjfdf33b9c3.636c-cloud1-4g5g6kjfdf33b9c3-1319303691/ads/activation2Raw.jpg"
    },
    loginFlag: false
  },

  /** 扫码识别ISBN */
  scanIsbn(){
    wx.scanCode({
      scanType:"barCode",
      success:res=>{
        var { result,scanType } = res;
        if(scanType!="EAN_13" || !/^978+[\d]+$/.test(result)){
          wx.showToast({
            title: '不是ISBN编码',
            success:res=>{
              setTimeout( wx.hideToast, 2000);
            }
          })
        }else{
          wx.navigateTo({
            url: '../../pages/bookinfo/bookinfo?isbn='+result,
          })
        }
      },
      fail:res=>{
        wx.showToast({
          title: '扫码出现问题',
          success:res=>{
            setTimeout( wx.hideToast, 2000);
          }
        })
      }
    })
  },

  /** 获取个人发布内容 */
  getMyPosted(){
    wx.cloud.callFunction({
      name: 'getPostsByUser',
      data: { openid: '' }
    }).then(res=>{
      // console.log(res)
      var { list } = res.result;
      this.setData({ myPosteds: list })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var loginflag = wx.getStorageSync('loginflag');
    if(loginflag||loginflag=='true'){
      this.getMyPosted();
      this.setData({ loginFlag: true })
    }else{
      this.setData({ loginFlag: false })
    }
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
    var loginflag = wx.getStorageSync('loginflag');
    if(loginflag||loginflag=='true'){
      if(!this.data.loginFlag){
        this.getMyPosted();
        this.setData({ loginFlag: true })
      }
    }else{
      this.setData({
        myPosteds: [],
        loginFlag: false
      })
    }
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
    var loginflag = this.data.loginFlag;
    if(loginflag||loginflag=='true'){
      this.getMyPosted();
    }
    wx.stopPullDownRefresh();
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