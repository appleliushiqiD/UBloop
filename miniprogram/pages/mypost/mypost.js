import common from "../../utils/common.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginFlag: false,
    myPosteds: [],
    tapPosted: {},
    showPostPage: false,
    postTime: '',
    inputVal: '',
  },

  /** 提交修改信息 */
  subPostInfo(res){
    // console.log(res)
    var { postPrice, postType } = res.detail.value;
    postPrice = common.getPrice(postPrice);
    if(postPrice>0){
      var { isbn, _id } = this.data.tapPosted;
      var postTime = this.data.postTime;
      var postinfo = {
        _id: _id,
        isbn: isbn,
        postType: postType,
        postPrice: postPrice,
        postTime: postTime
      }
      wx.cloud.callFunction({
        name: 'postBook',
        data: { type:'update', postinfo: postinfo }
      }).then(res=>{
        // console.log(res)
        if(res.result.errMsg=="document.update:ok"){
          wx.showToast({
            title: '更新成功',
            mask: true,
            success: setTimeout(wx.hideToast, 2000)
          })
          this.setData({ showPostPage: false })
          this.getMyPosted();
        }
      })
    }else{
      wx.showToast({
        title: '价格格式错误',
        mask: true,
        icon: 'error',
        success: res=>{ setTimeout( wx.hideToast, 2000) }
      })
    }
    
  },

  /** 输入价格-格式化 */
  chPrice(res){
    // console.log(res)
    var inputval = res.detail.value;
    var regValue = common.getPrice(inputval);
    this.setData({ inputVal: regValue })
  },

  /** 点击弹出修改窗口 */
  tapPost(res){
    // console.log(res);
    var { info } = res.currentTarget.dataset;

    if(!this.data.loginFlag){
      wx.showModal({
        title: '请先登录',
        content: '你还没有登录，登陆后发布',
      })
    }else{
      var date = common.getNowDate();
      this.setData({
        showPostPage: true,
        tapPosted: info,
        inputVal: info.postPrice,
        postTime: date
      })
    }
  },

  /** 删除发布内容 */
  deletePost(){
    var postinfo = this.data.tapPosted;
    delete postinfo.bookinfo;
    wx.cloud.callFunction({
      name: 'postBook',
      data: { type:'delete', postinfo: postinfo }
    }).then(res=>{
      // console.log(res)
      if(res.result.errMsg=="document.remove:ok"){
        wx.showToast({
          title: '删除成功',
          mask: true,
          success: setTimeout(wx.hideToast, 2000)
        })
        this.setData({ showPostPage: false })
      }
    })
    this.getMyPosted();
  },

  /** 点击隐藏 */
  clickHide(){
    this.setData({ showPostPage: false })
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
  onLoad: function (options) {
    var loginflag = wx.getStorageSync('loginflag');
    if(loginflag||loginflag=='true'){
      this.setData({ loginFlag: true })
    }
    this.getMyPosted();
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