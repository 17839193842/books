//获取应用实例
var app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {
   
  },
  onLoad: function (options) {
    var id=options.id
    console.log(id)
    var that = this
    // 使用 Mock
    API.ajax('', function (res) {
      //这里既可以获取模拟的res
      var data=res.data;
      console.log(data)
      for (var val in data) {
        console.log(val + " " + data[val]);
        if (val == id) {
          that.setData({
            list: data[val]
          })
        }
      }
      
      
    });

 
  }

})
