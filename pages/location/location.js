//获取应用实例
var app = getApp()
Page({
  data: {
    hasLocation: false,
    location: {
      longitude: "",
      latitude: "",
      name: "",
      address: ""
    }


  },
  onLoad: function () {
   
  },
  mapViewTap: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 28
        })
      }
    })
  },
  chooseMapViewTap: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res, "location")
        that.setData({
          hasLocation: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude,
            address: res.address,
            name: res.name
          },
          detail_info: res.address,
          wd: res.latitude,
          jd: res.longitude
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }



})
