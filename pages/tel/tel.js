var app=getApp();
Page({
   data:{
     disabled:true,
     name:'',
     sex:'',
     tel:'',
     address:'',
     checked:'',
     girlChecked:''
   },
   onLoad:function(){
     console.log(this.data.checked)
     var that=this;
     var name=wx.getStorageSync('name') || '';
     var sex = wx.getStorageSync('sex') || '';
     var tel = wx.getStorageSync('tel') || '';
     var address = wx.getStorageSync('address') || '';
     var checked = wx.getStorageSync('checked') || '';
     var girlChecked = wx.getStorageSync('girlChecked') || '';
  
     if(name==''){
        that.setData({
          disabled:false
        })
     }else{
       that.setData({
         disabled: true,
         name: name,
         sex: sex,
         tel: tel,
         address: address,
         checked:checked,
         girlChecked:girlChecked
       })
     }
   },
  updateInfo:function(){
     var that=this;
     wx.showModal({
       title: '个人信息',
       content: '确定要修改个人信息?',
       success:function(){
         that.setData({
           disabled: false
         })
       }
     })
  },
  saveInfo:function(){
    var that = this;
    var name = that.data.name, sex = that.data.sex, tel = that.data.tel, address = that.data.address, checked = that.data.checked, girlChecked = that.data.girlChecked;
    // 各项内容均不为空
    if(name!='' && sex!='' && tel!='' && address!=''){
      console.log(111)
      that.setData({
        disabled: true,
        name: name,
        sex: sex,
        tel: tel,
        address: address
      })
      wx.showToast({
        title: '保存修改成功',
      })
      wx.setStorageSync('name', name);
      wx.setStorageSync('sex', sex);
      wx.setStorageSync('tel', tel);
      wx.setStorageSync('address', address);
      wx.setStorageSync('checked', checked);
      wx.setStorageSync('girlChecked', girlChecked);
    }else{
      wx.showModal({
        title: '个人信息',
        content: '请填写完整的信息!',
      })
    }
    
  },
  // 性别改变
  radioChange:function(e){
    var that=this;
    var sex =e.detail.value;
    if(sex=='男'){
      console.log(sex)
      that.setData({
        checked:'true',
        girlChecked: 'false'
      })
    }else{
      that.setData({
        girlChecked:'true',
        checked: 'false',
      })
    }
    that.setData({
      sex:sex
    })
  },
  // 名字变化
  nameBlur:function(e){
   var name=e.detail.value;
   this.setData({
     name:name
   })
  },
  // 电话号码验证
  blurTel:function(e){
    var that=this;
    var tel=e.detail.value;
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
   if(!myreg.test(tel)){
     wx.showModal({
       title: '个人信息',
       content: '请填写正确的电话号码！'
     })
   }else{  //正确的电话号码
     that.setData({
       tel: tel
     })
   }
  
  },
  // 地址变化
  addressBlur:function(e){
    var address=e.detail.value;
    this.setData({
      address:address
    })
  }
})