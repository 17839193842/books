//获取应用实例
var app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {
    sum:0,
    isCheckAll:false
  },
  onLoad: function () {
    var that = this
    // 使用 Mock
    // API.ajax('', function (res) {
    //   //这里既可以获取模拟的res
    //   console.log(res)
    //   that.setData({
    //     list: res.data
    //   })
    // });
    var shopList = wx.getStorageSync('shopList') || [];
     that.setData({
       list:shopList
     })
  },
  // 单选或多选
  checkboxChange:function(e){
    var index = e.target.dataset.i;
    var that=this;
    var cartList=that.data.list;
      for (var i = 0; i < cartList.length; i++) {
       if(cartList[i].id==index){
         cartList[i].checked = !cartList[i].checked;
         if (cartList[i].checked==false){
           that.setData({
             isCheckAll:false
           })
         }
       }
    }

    that.setData({
      list:cartList
    })
    this.sumTotal();
  },
  // 全选
  checkboxAll:function(e){
    var that=this;
    let cartList=that.data.list,sum=0;
    if(e.detail.value=='all'){  //全选时
      that.setData({
        isCheckAll:true
      })
      cartList.forEach((item,index)=>{
        item['checked']=true;
        sum+=parseInt(item.price)*parseInt(item.total);
      })
    }else{
      that.setData({
        isCheckAll:false
      })
      cartList.forEach((item,index)=>{
        item['checked']=false;
      })
      sum=0;
    }
    sum = sum.toFixed(2);
    that.setData({
      list:cartList,
      sum:sum
    })
  
  },
  // 结算
  sumTotal:function(){
      var cartList = this.data.list;
      var sum = 0;
    for (var i = 0; i < cartList.length; i++) {
      var good = cartList[i];
        if (good.checked) {
         sum+=good.price*good.total;
        }
      }
      sum = sum.toFixed(2);
      this.setData({
       sum:sum
      })
  },
  // 删除
  delShop:function(e){
    var that=this;
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
          wx.setStorageSync('shopList',cartList);

        } else if (res.cancel) {
          console.log('用户点击取消删除操作')
        }
      }
    })  
  },
  // 加购物车数量
  plusShop:function(e){
    var cartList=this.data.list;
    var id = e.currentTarget.dataset.id;
    var that=this;
    cartList.forEach((item,index)=>{
      if(item['id']==id){
        cartList[index].total++;
        if (cartList[index].checked==true){
          this.sumTotal();
        }
      }
    })
    that.setData({
      list:cartList
    });
    wx.setStorageSync('shopList', cartList)
    
  },
  // 减购物车数量
  minusShop:function(e){
    var cartList = this.data.list;
    var id = e.currentTarget.dataset.id;
    var that = this;
    cartList.forEach((item, index) => {
      if (item['id'] == id) {
        if (cartList[index].total>1){
          cartList[index].total--;
        }else{
          cartList[index].total=1;
          wx.showToast({ // 显示Toast
            title: '最小数量为1',
            icon: 'success',
            duration: 1500
          })
        }
        if (cartList[index].checked == true) {
          this.sumTotal();
        }
      }
    })
    that.setData({
      list: cartList
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
