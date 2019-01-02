//index.js
//获取应用实例
const app = getApp()

var offline = false

Page({
  data: {
    Focus: [
      ],
    articleInfoList:[],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  onLoad: function () {
    this.queryRequest();
  },
  // 汇率请求
  queryRequest: function () {
    wx.showNavigationBarLoading();
    // console.log(keyF,keyT);
    console.log('query');
    var that = this;
    var url = "https://www.zouyh.cn/api/secure/v1/agent/home";
    console.log(url);
    if (offline) {
      return;
    }
    var data = this.json2Form({
      "body": {},
      "loginName": "wx4d81a029671c3179",
      "timestamp": 1528338185,
      "uuid": "4f2f6bedc7f5cbf835ffecec38782bc7",
      "version": "1.0",
      "sign": "bdd0fd8f1c2b9133c0aad80d56dd9b24"
    });
    console.log(data);
    wx.request({
      url: url,
      method: "POST", 
      header: {
        "Content-Type":"application/json"
      },
      data: {
        "body": {},
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
          console.log(data);
          that.setData({
            Focus: data.body.bannerList,
            articleInfoList: data.body.articleInfoList
          });
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
