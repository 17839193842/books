//获取应用实例
var app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {
   
  },
  onLoad: function (options) {
    var id=options.id
    var that = this
    // 使用 Mock
    API.ajax('', function (res) {
      //这里既可以获取模拟的res
      var data=res.data;
     console.log(typeof data)
      that.setData({
        list: data[id-1]
      })
    });
    console.log(this.data.list)
 
  }

})
