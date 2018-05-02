//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    queryRequest(null);
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})

function queryRequest(data) {
  wx.request({
    url: "https://sapi.k780.com/?app=finance.rate&scur=USD&tcur=CNY&appkey=33112&sign=bd9a79b0c0980d2b0382260153ba4c20",
    data: data,
    header: {
      // "Content-Type":"application/json"
    },
    success: function (res) {
      console.log(res.data)
    },
    fail: function (err) {
      console.log(err)
    }

  })

}