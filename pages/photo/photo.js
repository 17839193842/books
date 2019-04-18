var app=getApp();
Page({
  data:{
    camera:false,
    showModal:false,
    photoed:false,
    front:'back'
  },
  onLoad:function(){

  },
  photo:function(){
    this.setData({
      camera: true,
      showModal: true,
      photoed:true
    })
  },
  showModal:function(){
    this.setData({
      showModal: true,
      photoed:true
    })
  },
  hideModal:function(){
     this.setData({
       showModal:false,
       photoed:false
     })
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res)
        this.setData({
          src: res.tempImagePath,
          photoed:false
        })
      }
    })
  },
  error:function(e){
    console.log(e.detail.value);
  },
  // 保存拍照
  savePhoto:function(){
    this.hideModal();
  },
  // 切换前置摄像头
  tabPhoto:function(){
     var front=this.data.front;
     if(front=='back'){
       this.setData({
         front: 'front'
       })
     }else{
       this.setData({
         front: 'back'
       })
     }
     
  }
})