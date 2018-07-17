//detail.js
//获取应用实例
const app = getApp()

var offline = false
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    content: "",
  },
 
  onLoad: function (option) {
    console.log(option.id);
    this.queryRequest(option.id, option.type);
  },
  
  queryRequest: function (id,a_type) {
    wx.showNavigationBarLoading();
    // console.log(keyF,keyT);
    console.log('query');
    var that = this;
    var url = "https://www.zouyh.cn/api/secure/v1/agent/detail";
    console.log(url);
    if (offline) {
      return;
    }

    var body = this.json2Form({
      "id": "1",
      "dataType": "article"
    });

    var data = this.json2Form({
      "body": '{"id":"1","dataType":"article"}',
      "loginName": "wx4d81a029671c3179",
      "timestamp": 1528861206,
      "uuid": "bf6bdcef4294c51675c381a0ad656bd0",
      "version": "1.0",
      "sign": "318a0325516f160119d9dd489f6f8222"
    });
    console.log(data);
    var that = this;
    wx.request({
      url: url,
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "body": { "id": id, "dataType": a_type },
        "loginName": "wx4d81a029671c3179",
        "timestamp": 1528338185,
        "uuid": "4f2f6bedc7f5cbf835ffecec38782bc7",
        "version": "1.0",
        "sign": "bdd0fd8f1c2b9133c0aad80d56dd9b24"
      },
      success: function (res) {
        wx.hideNavigationBarLoading()
        if (res && res.statusCode && res.statusCode == 200) {
          var data = res.data;
          console.log(data.body.data.content);
          that.setData({
            content: data.body.data.content,
          });
          
          WxParse.wxParse('article', 'html', data.body.data.content, that, 5);
        }
        else {
          wx.showToast({
            title: '数据加载失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function (err) {
        console.log(err)
        wx.showToast({
          title: '数据加载失败',
          icon: 'none',
          duration: 2000
        })
      }

    })
  },
  json2Form(json) {
    var str = [];
    for (var p in json) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
  }
})