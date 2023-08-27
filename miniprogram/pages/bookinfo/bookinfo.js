// pages/bookinfo/bookinfo.js
import common from "../../utils/common.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginFlag: false,
    bookDetail: {},
    showPostPage: false,
    postTime: '',
    inputVal: '',
    postedBooks: [],
    selectorName: [ [ '价格', '时间'], ['出售', '求购'] ],
    selectorIndex: [0, 0]
  },

  /** 提交发布信息 */
  subPostInfo(res){
    // console.log(res)
    var { postPrice, postType } = res.detail.value;
    postPrice = common.getPrice(postPrice);
    if(postPrice>0){
      var isbn = this.data.bookDetail.isbn;
      var postTime = this.data.postTime;
      var postinfo = {
        isbn: isbn,
        postType: postType,
        postPrice: postPrice,
        postTime: postTime
      }
      wx.cloud.callFunction({
        name: 'postBook',
        data: { type:'add', postinfo: postinfo }
      }).then(res=>{
        // console.log(res)
        if(res.result.errMsg=="collection.add:ok"){
          wx.showToast({
            title: '发布成功',
            mask: true,
            success: setTimeout(wx.hideToast, 2000)
          })
          this.setData({ showPostPage: false })
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

  /** 点击发布窗口弹出 */
  tapPost(){
    if(!this.data.loginFlag){
      wx.showModal({
        title: '请先登录',
        content: '你还没有登录，登陆后发布',
      })
    }else{
      var date = common.getNowDate();
      this.setData({
        showPostPage: true,
        postTime: date
      })
    }
  },

  /** 点击隐藏 */
  clickHide(){
    this.setData({ showPostPage: false })
  },

  /** 接口获取书籍信息 */
  getBookFromApi(isbn){
    if(isbn==''){
      wx.showToast({
        title: 'ISBN错误',
        icon:'error',
        mask:true
      }).then(res=>{
        setTimeout( wx.hideToast, 2000);
      })
      return ;
    }
    var time = new Date();
    var timestamp = time.getTime();
    var appid = "f4LzVz5mVRrR4MoW";
    var appsecret = "f4LzVz5mVRrR4MoWqO3B9hCHFWd9UjBx";
    var signstr = appid + appsecret + timestamp;
    var productCode = "isbn_query";
    var sign = '';
    // console.log(signstr)
    wx.cloud.callFunction({
      name:"getSHA256",
      data:{
        signstr:signstr
      }
    }).then(res=>{
      sign = res.result;
      // console.log(sign)
      wx.request({
        url: 'https://api.jumdata.com/isbn/query',
        data:{
          appId: appid,
          timestamp: timestamp,
          sign: sign,
          productCode: productCode,
          isbn: isbn
        },
        success: res=>{
          // console.log(res)
          var code = res.data.code;
          if(code=='200'){
            var bookdetail = res.data.data.details[0];
            wx.cloud.callFunction({
              name:'addBookToDB',
              data: {
                bookinfo: bookdetail
              }
            }).then(res=>{
              this.setData({ bookDetail: bookdetail })
            })
          }else if(code=='201'){
            wx.showToast({
              title: '数据库未收录该书籍',
              mask: true,
              success: res=>{ setTimeout( wx.hideToast, 3000 ) }
            })
            this.setData({ bookDetail: false })
          }else{
            wx.showToast({
              title: '未知请求错误',
              mask: true,
              success: res=>{ setTimeout( wx.hideToast, 3000 ) }
            })
            this.setData({ bookDetail: false })
          }
          
        }
      })
    })
  },

  /** 数据库中获取数据 */
  getBookFromDB(isbn){
    // console.log(isbn)
    wx.cloud.callFunction({
      name:'getBookDetail',
      data:{ isbn: isbn }
    }).then(res=>{
      // console.log(res)
      var bookdetail = res.result.data
      if(bookdetail.length==1){
        this.setData({ bookDetail: bookdetail[0] })
      }else if(bookdetail.length==0){
        this.setData({ bookDetail: false })
        // console.log('尝试调用api')
        this.getBookFromApi(isbn);
      }      
    })
  },

  /** 修改获取方式 */
  chSelector(res){
    // console.log(res);
    // [ [ '价格', '时间'], ['出售', '求购'] ]
    var { value } = res.detail;
    var sortby = value[0]==0 ? 'price' : 'time';
    var type = value[1]==0 ? 'sell' : 'buy';
    var isbn = this.data.bookDetail.isbn;
    this.setData({ selectorIndex: value })
    this.getPosts(isbn, sortby, type);
  },

  /** 跳转到发布者页面 */
  tapPoster(res){
    // console.log(res);
    var { openid } = res.currentTarget.dataset.userinfo[0];
    var url = "../../pages/aboutme/aboutme?type=watch&openid="+openid;
    wx.navigateTo({
      url: url,
    })
  },

  /** 获取同书籍的发布内容 */
  getPosts(isbn, sortby='price', type='sell'){
    wx.cloud.callFunction({
      name: 'getPostsByIsbn',
      data: {
        isbn: isbn,
        sortby: sortby,
        type: type
      }
    }).then(res=>{
      // console.log(res);
      var { list } = res.result;
      this.setData({ postedBooks: list })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options)
    var isbn = options.isbn;
    this.getBookFromDB(isbn);
    this.getPosts(isbn,'price','sell');
    // console.log(this.data.bookDetail)
    // 异步数据出现问题，log提前输出默认值，但有数据获取
    var loginflag = wx.getStorageSync('loginflag')
    if(loginflag||loginflag=='true'){
      this.setData({ loginFlag: true })
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
    var { isbn } = this.data.bookDetail;
    var sortby = this.data.selectorIndex[0]==0 ? 'price' : 'time';
    var type = this.data.selectorIndex[1]==0 ? 'sell' : 'buy';
    this.getPosts( isbn, sortby, type );
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