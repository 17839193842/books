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
    API.ajax('', function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      that.setData({
        list: res.data
      })
    });

    console.log(this.data.list)
  },
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
  checkboxAll:function(e){
    var that=this;
    let cartList=that.data.list,sum=0;
    if(e.detail.value=='all'){  //全选时
      that.setData({
        isCheckAll:true
      })
      cartList.forEach((item,index)=>{
        item['checked']=true;
        sum+=parseInt(item.price);
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
  sumTotal:function(){
      var cartList = this.data.list;
      var sum = 0;
    for (var i = 0; i < cartList.length; i++) {
      var good = cartList[i];
        if (good.checked) {
         sum+=good.price;
        }
      }
      sum = sum.toFixed(2);
      this.setData({
       sum:sum
      })

  },
  delShop:function(e){
    var index = e.target.dataset.i;
    var cartList=this.data.list;
    for(var i=0;i<cartList.length;i++){
      if(cartList[i].id==index){
        cartList.splice(i,1);
      }
    }
   console.log(cartList)
    this.setData({
      list:cartList
    })
  }

})
