//获取应用实例
var app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {
    showModal:false,
    num:0
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
  showModal:function(){
    this.setData({
      showModal: true
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
    * 对话框取消按钮点击事件
    */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
    
    var bookList=this.data.list;
    var book = {};
    book.id=bookList[bookList.length-1].id+1;
    book.num = this.data.num;
    book.price = this.data.price;
    book.title = this.data.title;
    book.name=this.data.name;
    book.address=this.data.address;
    if (this.data.hasOwnProperty('title')){
      bookList.push(book);
      this.setData({
        list: bookList
      })
      wx.showToast({ // 显示Toast
        title: '图书更新啦',
        icon: 'success',
        duration: 1500
      })
    }
    
  },
  /**
     * 弹出框蒙层截断touchmove事件
     */
  preventTouchMove: function () {
  },
  // 销量
  inputChange:function(e){
    var num=parseInt(e.detail.value);
    this.setData({
      num:num
    })
  },
  // 价格
  priceChange: function (e){
    var price = parseInt(e.detail.value);
    this.setData({
      price: price
    })
  },
  // 书名
  titleChange:function(e){
    var title = e.detail.value;
    this.setData({
      title: title
    })
  },
  // 出版社
  addressChange:function(e){
    var address = e.detail.value;
    this.setData({
      address: address
    })
  },
  // 作者
  nameChange: function (e) {
    var name = e.detail.value;
    this.setData({
      name: name
    })
  }

})
