// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal:'',
    showClean:false,
    searchHistory:[],
    searchResult:[]
  },

  /** 键入过程 */
  onInput(res){
    var inputVal = res.detail.value;
    if(inputVal==""){
      this.setData({
        showClean: false
      })
    }else{
      this.setData({
        showClean: true
      })
    }
  },

  /** 清空输入内容 */
  cleanInput(){
    this.setData({
      inputVal:'',
      showClean:false
    })
  },

  /** 搜索内容 */
  getSearch(res){
    //console.log(res)
    var inputVal = res.detail.value;
    var newHistory = this.data.searchHistory;
    newHistory.unshift(inputVal);
    this.setData({
      searchHistory: newHistory
    });
    wx.setStorageSync('searchhistory', newHistory);
    
    /* 检索ISBN */
    if(inputVal.length == 13 && /^978+[\d]+$/.test(inputVal) ){
      wx.navigateTo({
        url: '../../pages/bookinfo/bookinfo?isbn='+inputVal,
      })
    }else if(inputVal!=''){
      wx.cloud.callFunction({
        name: 'searchBook',
        data: { input: inputVal }
      }).then(res=>{
        // console.log(res)
        var { data, errMsg } = res.result;
        if(errMsg=='collection.get:ok'){
          if(data.length=='0'){
            wx.showToast({
              title: '数据库中没有找到相关内容，可以尝试使用ISBN搜索',
              mask: true,
              icon: 'none',
              success: res=>{ setTimeout(wx.hideToast, 4000) }
            })
          }else{
            this.setData({ searchResult: data })
          }
        }else{
          wx.showToast({
            title: '查询失败',
            mask: true,
            icon: 'error',
            success: res=>{ setTimeout(wx.hideToast, 2000) }
          })
        }
      })
    }

  },

  /** 点击历史 */
  reSearch(res){
    var value = res.currentTarget.dataset.value;
    this.setData({
      inputVal:value,
      showClean:true
    })
  },

  /** 清空搜索历史 */
  cleanHistory(){
    wx.removeStorageSync('searchhistory');
    this.setData({
      searchHistory:[]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var searchhistory = wx.getStorageSync('searchhistory');
    //console.log(searchhistory)
    this.setData({
      searchHistory: ( searchhistory.length!=0 ? searchhistory : [] )
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