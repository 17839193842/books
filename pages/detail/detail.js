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
 
  },
  addShop:function(e){
    console.log(e.currentTarget.dataset.id);
    wx.showToast({ // 显示Toast
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    })
    this.data.list.shoped=true;
    console.log(this.data.list)
  },
  collect:function(e){
    console.log(e.currentTarget.dataset.id);
    wx.showToast({ // 显示Toast
      title: '收藏成功',
      icon: 'success',
      duration: 2000
    })
    this.data.list.collected = true;
    console.log(this.data.list)
  }

})
