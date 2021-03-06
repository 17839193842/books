//获取应用实例
var app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {
    userInfo:{},
    hasLocation: false
  },
  onLoad: function () {
   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
},
  goShopping: function (e) {
    wx.navigateTo({
      url: '../shopping/shopping'
    })
  },
  goCollect:function(e){
    wx.navigateTo({
      url: '../collect/collect'
    })
  },
  // 我的地图

  locationViewTap: function () {
    wx.navigateTo({
      url: '../location/location'
    })
  },
  // 联系方式
  goTel:function(){
    wx.navigateTo({
      url: '../tel/tel'
    })
  },
  // 相册
  goPhoto:function(){
    wx.navigateTo({
      url: '../photo/photo'
    })
  }
 

})
