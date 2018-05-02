//index.js
//获取应用实例
const app = getApp()

var offline = false;

var util = require('../../utils/util.js');

var today = util.formatTime(new Date());
console.log(today);

var objectBJ = [
  {
    id: 'USD',
    name: '美元'
  },
  {
    id: 'JPY',
    name: '日元'
  },
  {
    id: 'HKD',
    name: '港币'
  },
  {
    id: 'CNY',
    name: '人民币'
  },
  {
    id: 'CNH',
    name: '离岸人民币'
  },
  {
    id: 'TWD',
    name: '台币'
  },
  {
    id: 'MYR',
    name: '林吉特'
  },
  {
    id: 'EUR',
    name: '欧元'
  },
];

Page({
  onShareAppMessage: function () {
    return {
      title: '汇率速算',
      desc: '购物小帮手',
      path: '/page/index'
    }
  },
  data: {
    // priceF: 0.00,
    priceT: 0.00,
    contryF: 2,
    contryT: 3,
    objectArray: objectBJ,
    index: 0,
    rate: 0,
    date: today,
    today:today,
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '汇率'
    })
    //加载当前汇率
    // queryRequest('USD');
    // queryRequest('JPY');
    this.queryRequest('HKD','CNY');
    // this.setData({
    //   rate:0.8
    // });
  },

  bindPickerChange: function (e) {
    // var key = 'HKD'
    // console.log(e.detail.value);
    // if (e.detail.value == 0)
    //   key = 'USD';
    // else if (e.detail.value == 1)
    //   key = 'JPY';
    // else if (e.detail.value == 2)
    //   key = 'HKD';

    // console.log(e.target.dataset.key);
    var that = this;
    var keyF = that.data.contryF;
    var keyT = that.data.contryT;

    if ("contryF" == e.target.dataset.key) {
      keyF = e.detail.value;
    }
    else {
      keyT = e.detail.value;
    }

    this.setData({
      contryF: e.detail.value,
      priceF: null,
      priceT: 0.00,
      contryF: keyF,
      contryT: keyT
    });
    this.queryRequest(objectBJ[keyF]['id'], objectBJ[keyT]['id']);
  },
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    
    var that = this;
    var keyF = that.data.contryF;
    var keyT = that.data.contryT;

    this.setData({
      contryF: e.detail.value,
      priceF: null,
      priceT: 0.00,
      contryF: keyF,
      contryT: keyT,
      date: e.detail.value
    });

    console.log(e.detail.value,today)
    if (today == e.detail.value){
      this.queryRequest(objectBJ[keyF]['id'], objectBJ[keyT]['id']);
    }
    else{
      this.queryHistoryRequest(e.detail.value, objectBJ[keyT]['id'], objectBJ[keyF]['id']);
    }
  },
  bindPriceInput: function (e) {
    this.setData({
      priceF: e.detail.value,
      priceT: (this.data.rate * e.detail.value).toFixed(2),
    })
  },

  //历史汇率请求
  queryHistoryRequest: function (date, keyF, keyT) {
    console.log('query his');
    date = date.replace('-', '');
    date = date.replace('-', '');
    var that = this;
    var url = 'https://sapi.k780.com/?app=finance.rate_unionpayintl&cur_base=' + keyF + '&cur_transaction=' + keyT + '&cur_date=' + date + '&appkey=33112&sign=bd9a79b0c0980d2b0382260153ba4c20'
    console.log(url);
    if (offline){
      return;
    }
    wx.request({
      url: url,
      header: {
        // "Content-Type":"application/json"
      },
      success: function (res) {
        console.log(res);
        // console.log(that);
        that.setData({
          rate: res.data.result.exchange_rate
        })
        // that.data.rate = res.data.result.rate;
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  // 汇率请求
  queryRequest: function (keyF, keyT) {
    // console.log(keyF,keyT);
    console.log('query');
    var that = this;
    var url = "https://sapi.k780.com/?app=finance.rate&scur=" + keyF + "&tcur=" + keyT + "&appkey=33112&sign=bd9a79b0c0980d2b0382260153ba4c20";
    console.log(url);
    if (offline) {
      return;
    }
    wx.request({
      url: url,
      header: {
        // "Content-Type":"application/json"
      },
      success: function (res) {
        console.log(res);
        that.setData({
          rate: res.data.result.rate
        })
        // that.data.rate = res.data.result.rate;
      },
      fail: function (err) {
        console.log(err)
      }

    })

  }
})