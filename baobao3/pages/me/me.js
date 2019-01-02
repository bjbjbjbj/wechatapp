const app = getApp()

Page({
  onLoad: function (option) {
    return;
    wx.makePhoneCall({
      phoneNumber: '13430243280', //此号码并非真实电话号码，仅用于测试  
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  calling: function () {
    
  }  
});