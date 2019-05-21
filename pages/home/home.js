//获取应用实例
var app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {
    searchValue: ''
  },
  onLoad: function () {
    var that = this
    // 使用 Mock
    var list=wx.getStorageSync('list') || [];
    if(list.length<=0){
       API.ajax('', function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      that.setData({
        list: res.data
      })
    });
    }else{
      that.setData({
        list: list
      })
    }
    
  },
  goEntry:function(){
    console.log(1111)
    wx.navigateTo({
      url: '../bookentry/bookentry'
    })
  },
  goBookDetail: function (e) { 
    var that=this;
    var bookId = e.currentTarget.dataset.bookid;
    wx.navigateTo({ 
      url: '../detail/detail?id='+bookId
     }) 
  },
  // 搜索
  search:function(e){
    console.log(e)
    var that=this;
    var key;
    if (e.detail.hasOwnProperty('value')){
      key = e.detail.value;
    }else{
      key = e.currentTarget.dataset.val;
    }
    var valueList = this.data.list;
    var arr = [];
    console.log(key+'key')
    if(key!=''){
      wx.showToast({ // 显示Toast
        title: '加载中',
        icon: 'loading',
        duration: 100,
        success:function(){
          for (let i in valueList) {
            if (valueList[i].title.indexOf(key) >= 0) {//查找
              arr.push(valueList[i])
            }
          }
          if (arr.length == 0) {
            that.setData({
              list: []
            })
          } else {
            that.setData({
              list: arr//在页面显示找到的数据
            })
          }

        }
      })
      
    }else{
      wx.showToast({ // 显示Toast
        title: '搜索不能为空',
        icon: 'loading',
        duration: 1000
      })
    }
    
    console.log(this.data.list)
  },
  // 搜索字段设置
  inputValue:function(e){
    var that=this;
    this.setData({
      searchValue: e.detail.value
    })
    if (this.data.searchValue == '') {
     
      var list = wx.getStorageSync('list') || [];
      if(list.length<=0){
        API.ajax('', function (res) {
          //这里既可以获取模拟的res
          console.log(res)
          that.setData({
            list: res.data
          })
        });
      }else{
        that.setData({
          list: list
        })
      }
    
    }
  }

})
