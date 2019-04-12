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
    // API.ajax('', function (res) {
    //   //这里既可以获取模拟的res
    //   console.log(res)
    //   that.setData({
    //     list: res.data
    //   })
    // });
    var collectList = wx.getStorageSync('collectList');
    console.log(collectList)
   that.setData({
     list:collectList
   })
   
  },
  // 删除
  delShop: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认要删除？',
      confirmText: '确认',
      cancelText: '取消',
      success: function (res) {
        if (res.confirm) {
          console.log("确认");
          var index = e.target.dataset.i;
          var cartList = that.data.list;
          for (var i = 0; i < cartList.length; i++) {
            if (cartList[i].id == index) {
              cartList.splice(i, 1);
            }
          }
          console.log(cartList)
          that.setData({
            list: cartList
          })
        wx.setStorageSync('collectList',cartList);

        } else if (res.cancel) {
          console.log('用户点击取消删除操作')
        }
      }
    })
  },
  // 进入详情页
  goBookDetail: function (e) {
    var that = this;
    var bookId = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: '../detail/detail?id=' + bookId
    })
  },


})
