// pages/aboutme/aboutme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginFlag: false,
    openType: '',
    userInfo:{},
    otherInfo:{},
    avatarUrl: '',
    avatarChecker: true,
    nicknameChecker: true,
    sameMsgTool: true
  },

  /** 键入msgTool */
  changeMsg(res){
    // console.log(res)
    var msgtool = res.detail.value;
    if(msgtool!=this.data.userInfo.msgTool){
      this.setData({ sameMsgTool: false })
    }else{
      this.setData({ sameMsgTool: true })
    }
  },

  /** 保存内容 */
  submitInfo(subget){
    // console.log(res)
    var { msgtool, nickname } = subget.detail.value;
    var userinfo = this.data.userInfo;
    if(msgtool==''){ msgtool='联系方式' }
    if(nickname==''||this.data.nicknameChecker==false){ nickname=userinfo.nickName }
    wx.cloud.callFunction({
      name: 'checkMsg',
      data: {
        content: msgtool,
        type: 1
      }
    }).then(res=>{
      // console.log(res)
      var { openid, errCode, result } = res.result;
      var { suggest, label } = result;
      if(errCode!=0||suggest=='risky'){
        wx.showToast({
          title: '联系方式审核不通过:'+errCode+'-'+label,
          mask: true,
          icon: 'error',
          success: setTimeout( wx.hideToast, 2000)
        })
      }else{
        // msgtool check pass
        wx.showToast({
          title: '数据保存中',
          icon: 'loading',
          mask: true,
        })
        userinfo.msgTool = msgtool;
        userinfo.nickName = nickname;
        if(this.data.avatarChecker){
          if(this.data.avatarUrl!=''){
            // 异步上传
            wx.cloud.uploadFile({
              cloudPath: "usersAvatar/"+openid+".jpg", // 上传至云端的路径
              filePath: this.data.avatarUrl, // 小程序临时文件路径
              success: res => {
                // console.log(res)
                var { errMsg, fileID } = res;
                // console.log(errMsg=='cloud.uploadFile:ok')
                if(errMsg=='cloud.uploadFile:ok'){
                  userinfo.avatarUrl = fileID;
                  wx.cloud.callFunction({
                    name: 'updateUser',
                    data: { userinfo: userinfo }
                  }).then(res=>{
                    // console.log(res)
                    var { errMsg } = res.result
                    if(errMsg=='collection.update:ok'){
                      wx.showToast({
                        title: '更新成功',
                        mask: true,
                        icon: 'success',
                        success: setTimeout( wx.hideToast, 2000)
                      })
                      wx.cloud.callFunction({
                        name: 'getUserInfo',
                        data: { openid: '' }
                      }).then(res=>{
                        this.setData({ userInfo: res.result.userinfo })
                        wx.setStorageSync('userinfo', res.result.userinfo)
                      })
                    }else if(errMsg=='collection.add:ok'){
                      wx.showToast({
                        title: '注册成功',
                        mask: true,
                        icon: 'success',
                        success: setTimeout( wx.hideToast, 2000)
                      })
                      wx.cloud.callFunction({
                        name: 'getUserInfo',
                        data: { openid: '' }
                      }).then(res=>{
                        this.setData({
                          loginFlag: true,
                          userInfo: res.result.userinf
                         })
                      })
                    }else{
                      wx.showToast({
                        title: '失败',
                        mask: true,
                        icon: 'error',
                        success: setTimeout( wx.hideToast, 2000)
                      })
                    }
                  })
                }
              },
              fail: console.error
            })
          }else{
            wx.cloud.callFunction({
              name: 'updateUser',
              data: { userinfo: userinfo }
            }).then(res=>{
              // console.log(res)
              var { errMsg } = res.result
              if(errMsg=='collection.update:ok'){
                wx.showToast({
                  title: '更新成功',
                  mask: true,
                  icon: 'success',
                  success: setTimeout( wx.hideToast, 2000)
                })
                wx.cloud.callFunction({
                  name: 'getUserInfo',
                  data: { openid: '' }
                }).then(res=>{
                  this.setData({ userInfo: res.result.userinfo })
                  wx.setStorageSync('userinfo', res.result.userinfo)
                })
              }else if(errMsg=='collection.add:ok'){
                wx.showToast({
                  title: '注册成功',
                  mask: true,
                  icon: 'success',
                  success: setTimeout( wx.hideToast, 2000)
                })
                wx.cloud.callFunction({
                  name: 'getUserInfo',
                  data: { openid: '' }
                }).then(res=>{
                  this.setData({
                    loginFlag: true,
                    userInfo: res.result.userinf
                   })
                })
              }else{
                wx.showToast({
                  title: '失败',
                  mask: true,
                  icon: 'error',
                  success: setTimeout( wx.hideToast, 2000)
                })
              }
            })
          }
        }
      }
    })
  },

  /** 设置头像 */
  chooseAvatar(res){
    // console.log(res)
    var tempurl = res.detail.avatarUrl
    wx.cloud.callFunction({
      name: 'checkAvatar',
      data: {
        avatarurl: wx.cloud.CDN({
          type: 'filePath',
          filePath: tempurl,
        })
      }
    }).then(res=>{
      // console.log(res)
      var { errCode, traceId } = res.result
      if(errCode!=0){
        wx.showToast({
          title: '头像审核未通过',
          icon: 'error',
          mask: true,
          success: res=>{
            setTimeout(wx.hideToast, 2000)
          }
        })
        this.setData({ avatarChecker: false })
      }else{
        var userinfo = this.data.userInfo;
        userinfo.avatarUrl = tempurl
        this.setData({
          avatarChecker: true,
          sameMsgTool: false,
          avatarUrl: tempurl,
          userInfo: userinfo
        })
      }
    })    
  },

  /** 检查昵称 */
  checkName(res){
    // console.log(res)
    var { pass } = res.detail;
    if(pass){
      this.setData({
        nicknameChecker: true,
        sameMsgTool: false
      })
    }else{
      wx.showToast({
        title: '昵称审核未通过',
        mask: true,
        icon: 'error',
        success: res=>{
          setTimeout( wx.hideToast, 2000)
        }
      })
      this.setData({ nicknameChecker: false })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options)
    var { type, openid } = options;
    var loginflag = wx.getStorageSync('loginflag');
    // check self login
    if(loginflag){
      // 获取本地数据
      var userinfo = wx.getStorageSync("userinfo");
      this.setData({
        loginFlag: true,
        userInfo: userinfo
      })
    }
    // console.log(type)
    if(type=="sign"){
      // sign an account
      wx.setNavigationBarTitle({ title: '注册', })
      wx.cloud.callFunction({
        name: 'getUserInfo',
        data: { openid: '' }
      }).then(res=>{
        // console.log(res)
        var { msg, userinfo } = res.result;
        if(msg=='noSelf'){
          // get default info
          this.setData({
            openType: 'sign',
            loginFlag: false,
            userInfo: userinfo
          })
        }
      })
    }else if(loginflag&&type=="watch"&&openid!=this.data.userInfo.openid){
      wx.cloud.callFunction({
        name: 'getUserInfo',
        data: { openid: openid}
      }).then(res=>{
        // console.log(res)
        var { msg, userinfo, OPENID, openid } = res.result;
        if(msg=='other'){
          this.setData({
            otherInfo: userinfo,
            openType: type
          })
        }else if(msg=='noOther'){
          wx.showToast({
            title: '没有找到这个人',
            mask: true,
            icon: 'error',
            success: setTimeout( wx.hideToast, 3000)
          })
          wx.navigateBack({});
        }else{
          wx.showToast({
            title: '请求出错',
            mask: true,
            icon: 'error',
            success: setTimeout( wx.hideToast, 3000)
          })
        }
      })
    }else{
      this.setData({ 
        openType: 'change'
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