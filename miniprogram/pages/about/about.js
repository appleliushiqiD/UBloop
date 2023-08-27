// pages/about/about.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    signFlag: false,
    loginFlag: false,
    userInfo:{},
    funcList:[
      {
        title:"个人信息",
        iconUrl:"../../images/icon/profile.png",
        url:"../../pages/aboutme/aboutme"
      },{
        title:"我的发布",
        iconUrl:"../../images/icon/post.png",
        url:"../../pages/mypost/mypost"
      },{
        title:"使用公告",
        iconUrl:"../../images/icon/announcement.png",
        url:"../../pages/usage/usage"
      }
    ]
  },

  /** 用户注册 */
  getSign(){
    wx.navigateTo({
      url: '../../pages/aboutme/aboutme?type=sign',
      success: res=>{
        this.getLogin()
      }
    })
  },

  /** 获取登录信息 */
  getLogin(){
    wx.showToast({
      title: '登录中...',
      mask: true,
      icon: 'loading'
    })
    wx.cloud.callFunction({
      name: 'getUserInfo',
      data: { openid: '' }
    }).then(res=>{
      var { msg, userinfo, OPENID, openid } = res.result;
      if(msg=='self'){
        this.setData({
          signFlag: true,
          loginFlag: true,
          userInfo: userinfo
        })
        wx.setStorageSync('signflag', true)
        wx.setStorageSync('loginflag', true)
        wx.setStorageSync('userinfo', userinfo)
      }
      wx.hideToast();
    })
  },

  /** 退出登录 */
  getLogout(){
    wx.showToast({
      title: '退出中……',
      mask:true,
      icon:'loading',
      success:res=>{
        wx.cloud.callFunction({
          name: 'getUserInfo',
          data: { openid: 'openid' }
        }).then(res=>{
          var { userinfo, msg, OPENID ,openid } = res.result;
          this.setData({
            signFlag: true,
            loginFlag: false,
            userInfo: userinfo
          })
          wx.setStorageSync('signflag', true)
          wx.setStorageSync('loginflag', false)
          wx.setStorageSync('userinfo', userinfo)

        })
        setTimeout(wx.hideToast,1000);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // var signflag = wx.getStorageSync("signflag");
    var loginflag = wx.getStorageSync("loginflag");
    //console.log(flag=='')
    if(loginflag==''||loginflag==false){
      // 本地没有数据
      // get from cloud DB
      wx.cloud.callFunction({
        name: 'getUserInfo',
        data: { openid : '' }
      }).then(res=>{
        // console.log(res)
        var { msg, userinfo, OPENID, openid } = res.result;
        if(msg=='self'){
          this.setData({
            signFlag: true,
            loginFlag: true,
            userInfo: userinfo
          })
          wx.setStorageSync('signflag', true)
          wx.setStorageSync('loginflag', true)
          wx.setStorageSync('userinfo', userinfo)
        }else if(msg=='noSelf'){
          this.setData({
            signFlag: false,
            loginFlag: false,
            userInfo: userinfo
          })
        }else{
          this.setData({
            signFlag: false,
            loginFlag: false,
            userInfo: userinfo
          })
        }
      })
    }else if(loginflag==true){
      // 获取本地数据
      var userinfo = wx.getStorageSync("userinfo");
      this.setData({
        signFlag: true,
        loginFlag: true,
        userInfo: userinfo
      })
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
    if(loginflag!=this.data.loginFlag){
      console.log('reload')
      this.onLoad();
    }
    // console.log(loginflag=='true')
    if(loginflag){
      var userinfo = wx.getStorageSync('userinfo')
      this.setData({ userInfo: userinfo })
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