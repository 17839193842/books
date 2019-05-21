var app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {
    currentTab: 'a' ,     //给一个默认值，默认第一个选中
    list: [],      //存放某一类数据
    lists: []      //存放模拟的所有的数据
  },
  onLoad: function(){
    var that=this;
    API.ajax('', function (res) {
      //这里既可以获取模拟的res
      var lists=res.data;  //返回的数据
      var list=[];
      lists.forEach(function(item,index){
        if(item.type=='a'){
          list.push(item);
        }
      })
      that.setData({
        list: list,
        lists:lists
      })
    })
  },
  // tab切换
  changTab: function (event) {
    var index = event.target.dataset.current;
    var list=[];
    var lists=this.data.lists;
    lists.forEach(function(item,i){
       if(item.type==index){
          list.push(item)
       }
    })
    console.log(list);
    this.setData({
      currentTab: event.target.dataset.current,
      list:list
    })
  },
  // 进入详情页
  goBookDetail: function (e) {
    var that = this;
    var bookId = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: '../detail/detail?id=' + bookId
    })
  }

})