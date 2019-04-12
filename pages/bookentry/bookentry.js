//获取应用实例
var app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {
    showModal:false,
    num:0,
    tempFilePaths: [],
    empty:false,
    list:[],
    updateBook:[],
    update:false
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
    var list=wx.getStorageSync('list') || []
    that.setData({
      list:list
    })
    console.log(this.data.list)
  },
  showModal:function(){
    this.setData({
      showModal: true,
      imagesList:[],
      empty: false,
      updateBook: []
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false,
      empty: false,
      update: false
    });
  },
  /**
    * 对话框取消按钮点击事件
    */
  onCancel: function () {
    this.hideModal();
    this.setData({
      imagesList: []
    })
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var that=this;
    this.hideModal();
    if (this.data.hasOwnProperty('title')) {
    var bookList=this.data.list;
    var book = {};
    book.id = bookList.length > 0 ? bookList[bookList.length - 1].id + 1 :1  ;
    book.num = this.data.num;
    book.price = this.data.price;
    book.title = this.data.title;
    book.name=this.data.name;
    book.address=this.data.address;
    book.img = this.data.imagesList[0];
      console.log(bookList)
      bookList.push(book);
      this.setData({
        list: bookList
      })
      wx.showToast({ // 显示Toast
        title: '图书录入更新啦',
        icon: 'success',
        duration: 1500
      })
      // 本地存储
    wx.setStorageSync('list', that.data.list);
    }else{
      wx.showModal({
        content: '图书名不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
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
    if(e.detail.value!=''){
      this.setData({
        empty: false
      })
    }else{
      this.setData({
        empty: true
      })
    }
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
  },


// 上传图片
  uploader: function () {
    var that = this;
    let imagesList = [];
    let maxSize = 1024 * 1024;
    let maxLength =1;
    let flag = true;
    wx.chooseImage({
      count: 6, //最多可以选择的图片总数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 500
        })
        for (let i = 0; i < res.tempFiles.length; i++)       {
          if (res.tempFiles[i].size > maxSize) {
            flag = false;
            wx.showModal({
              content: '图片太大，不允许上传',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });

          }
        }

        if (res.tempFiles.length > maxLength) {
          wx.showModal({
            content: '最多能上传' + maxLength + '张图片',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('确定');
              }
            }
          })
        }

        if (flag == true && res.tempFiles.length <= maxLength) {
          that.setData({
            imagesList: res.tempFilePaths
          })
        }

        // wx.uploadFile({
        //   url: 'https://shop.gxyourui.cn',
        //   filePath: res.tempFilePaths[0],
        //   name: 'images',
        //   header: {
        //     "Content-Type": "multipart/form-data",
        //     'Content-Type': 'application/json'
        //   },
        //   success: function (data) {
        //     console.log(data);
        //   },
        //   fail: function (data) {
        //     console.log(data);
        //   }
        // })

      },
      fail: function (res) {
        console.log(res);
      }

    })
  },
  // input失去焦点
  bindblur:function(e){
    console.log(e);
    if(e.detail.value==''){
      this.setData({
        empty:true
      })
    }else{
      this.setData({
        empty: false
      })
    }
  },
  goBookDetail: function (e) {
    var that = this;
    var bookId = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: '../detail/detail?id=' + bookId
    })
  },
  // 删除图书录入
  delEntry: function (e) {
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
          wx.setStorageSync('list', cartList);

        } else if (res.cancel) {
          console.log('用户点击取消删除操作')
        }
      }
    })
  },
  // 修改图书信息
  updateBook:function(e){
    this.setData({
      update:true
    })
    this.showModal();
    var that=this;
    console.log(e)
    var id = e.currentTarget.dataset.id;
     var list=that.data.list;
     list.forEach((item,index)=>{
       if(item['id']==id){
         that.setData({
           updateBook:item
         })
       }
     })
   console.log(that.data.updateBook);
  },
  // 关闭模态框
  cancelModal:function(e){
    this.hideModal();
  }


})
