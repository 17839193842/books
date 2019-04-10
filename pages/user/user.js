//获取应用实例
var app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {

  },
  onLoad: function () {
    // 使用 Mock
    API.ajax('', function (res) {
      //这里既可以获取模拟的res
      var data = res.data;
      
    });
    console.log(this.data.list);
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
  }
 

})
