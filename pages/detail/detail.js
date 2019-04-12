//获取应用实例
var app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {
   shopList:[],
   collectList:[]
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
    var shopList = wx.getStorageSync('shopList');
    var collectList = wx.getStorageSync('collectList')
     
  },
  addShop:function(e){
    var that=this;
    var shopList = wx.getStorageSync('shopList') || [] ;
    var id=e.currentTarget.dataset.id;
        this.data.list.shoped = true;
        shopList.push(that.data.list)
        wx.setStorageSync('shopList', shopList);
        wx.showToast({ // 显示Toast
          title: '加入购物车成功',
          icon: 'success',
          duration: 1000
        })
    setTimeout(function () {
      wx.navigateTo({
        url: '../shopping/shopping'
      })
    }, 500)
  },
  collect:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    var collectList = wx.getStorageSync('collectList') || [] ;
    collectList.push(that.data.list);
    wx.setStorageSync('collectList', collectList);
    wx.showToast({ // 显示Toast
      title: '收藏成功',
      icon: 'success',
      duration: 1000
    })
    setTimeout(function(){
      wx.navigateTo({
        url: '../collect/collect'
      }) 
    },500)
    this.data.list.collected = true;
    console.log(this.data.list)
  }

})
