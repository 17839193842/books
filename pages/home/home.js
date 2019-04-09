//获取应用实例
var app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    // 使用 Mock
    API.ajax('', function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      that.setData({
        list: res.data
      })
    });

    console.log(this.data.list)
  },
  goBookDetail: function (e) { 
    var bookId = e.currentTarget.dataset.bookid;         console.log(bookId); 
    wx.navigateTo({ 
      url: '../detail/detail?id='+bookId
     }) 
  }

})
