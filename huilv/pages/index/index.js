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
    id: 'RUB',
    name: '俄罗斯卢布'
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
    id: 'KRW',
    name: '韩元'
  },
  {
    id: 'MYR',
    name: '林吉特'
  },
  {
    id: 'EUR',
    name: '欧元'
  },
  {
    id: 'MOP',
    name: '澳门币'
  },
  {
    id: 'TWD',
    name: '台币'
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
    priceF: null,
    priceT: 0.00,
    contryF: 2,
    contryT: 4,
    objectArray: objectBJ,
    index: 0,
    rate: 0,
    date: today,
    today: today,
  },

  onLoad: function () {
    var cacheF = 2;
    var cacheT = 4;
    if (offline) {
      this.setData({
        rate: 1,
      });
    }
    try {
      var value = wx.getStorageSync('cache')
      if (value) {
        // Do something with return value
        console.log(value);
        var tmp = value.split(',');
        if (tmp.length == 2) {
          cacheF = tmp[0];
          cacheT = tmp[1];
        }
      }
      else {
        console.log('no cache');
      }
    } catch (e) {
      // Do something when catch error
    }

    wx.setNavigationBarTitle({
      title: '汇率'
    });

    this.setData({
      contryF: cacheF,
      contryT: cacheT
    });

    //加载当前汇率
    // queryRequest('USD');
    // queryRequest('JPY');
    // wx.showLoading({
    //   title: '汇率加载中',
    // });
    this.queryRequest(objectBJ[cacheF]['id'], objectBJ[cacheT]['id']);
    // console.log(this.express('1+2*4-1+6/3'));
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

    wx.setStorage({
      key: "cache",
      data: keyF + ',' + keyT
    });

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

    console.log(e.detail.value, today)
    if (today == e.detail.value) {
      this.queryRequest(objectBJ[keyF]['id'], objectBJ[keyT]['id']);
    }
    else {
      this.queryHistoryRequest(e.detail.value, objectBJ[keyT]['id'], objectBJ[keyF]['id']);
    }
  },
  
  //历史汇率请求
  queryHistoryRequest: function (date, keyF, keyT) {
    wx.showNavigationBarLoading();
    console.log('query his');
    date = date.replace('-', '');
    date = date.replace('-', '');
    var that = this;
    var url = 'https://sapi.k780.com/?app=finance.rate_unionpayintl&cur_base=' + keyF + '&cur_transaction=' + keyT + '&cur_date=' + date + '&appkey=33112&sign=bd9a79b0c0980d2b0382260153ba4c20'
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
        wx.hideNavigationBarLoading()
        console.log(res);
        // console.log(that);
        if (res && res.data && res.data.result && res.data.result.exchange_rate) {
          that.setData({
            rate: res.data.result.exchange_rate
          });
        }
        else {
          wx.showToast({
            title: '数据加载失败',
            icon: 'none',
            duration: 2000
          })
        }
        // that.data.rate = res.data.result.rate;
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

  // 汇率请求
  queryRequest: function (keyF, keyT) {
    wx.showNavigationBarLoading();
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
        wx.hideNavigationBarLoading()
        console.log(res);
        if (res && res.data && res.data.result && res.data.result.rate) {
          that.setData({
            rate: res.data.result.rate
          })
        }
        else {
          wx.showToast({
            title: '数据加载失败',
            icon: 'none',
            duration: 2000
          })
        }
        // that.data.rate = res.data.result.rate;
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

  //绑定键盘数据
  bindBtnClick: function (e) {
    var that = this;
    var priceF = that.data.priceF == null ? 0 : that.data.priceF;
    console.log(priceF);
    var tmp = '';
    var id = parseInt(e.target.dataset.id);
    switch (id) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        tmp = e.target.dataset.id + '';
        break;
      //+
      case 10:
        tmp = '+';
        break;
      //-
      case 11:
        tmp = '-';
        break;
      //*
      case 12:
        tmp = '*';
        break;
      // /
      case 13:
        tmp = '/';
        break;
      // .
      case 14:
        tmp = '.';
        break;
      // <-
      case 15:
        tmp = '';
        break;
      default:
        console.log('error');
        break;
    }
    if (tmp.length > 0) {
      if (priceF == 0)
        priceF = tmp;
      else
        priceF = priceF + tmp;
    }
    else {
      priceF = priceF + '';
      if (priceF.length > 1) {
        priceF = priceF.substring(0, priceF.length - 1);
      }
      else {
        priceF = null;
      }
    }
    console.log(priceF);
    var total = null;
    if (priceF != null)
      total = that.express(priceF);
    console.log(total);
    if (isNaN(total)){
      that.setData({
        priceF: priceF,
        priceT: '计算中',
      })
    }
    else{
      that.setData({
        priceF: priceF,
        priceT: (that.data.rate * total).toFixed(2),
      })
    }
  },

  //计算工具
  express: function () {

    function express(expression) {
      return cc(c2a(expression));
    }

    // 两个浮点数求和  
    express.add = function (a, b) {
      var r1, r2, m;
      try {
        r1 = a.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = b.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      return Math.round(a * m + b * m) / m;
    }

    // 两个浮点数相减  
    express.sub = function (a, b) {
      var r1, r2, m, n;
      try {
        r1 = a.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = b.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      n = (r1 >= r2) ? r1 : r2;
      return (Math.round(a * m - b * m) / m).toFixed(n);
    }

    // 两数相除  
    express.div = function (a, b) {
      var t1, t2, r1, r2;
      try {
        t1 = a.toString().split('.')[1].length;
      } catch (e) {
        t1 = 0;
      }
      try {
        t2 = b.toString().split(".")[1].length;
      } catch (e) {
        t2 = 0;
      }
      r1 = Number(a.toString().replace(".", ""));
      r2 = Number(b.toString().replace(".", ""));
      return (r1 / r2) * Math.pow(10, t2 - t1);
    }

    express.mul = function (a, b) {
      var m = 0, s1 = a.toString(), s2 = b.toString();
      try {
        m += s1.split(".")[1].length
      } catch (e) {
      }
      try {
        m += s2.split(".")[1].length
      } catch (e) {
      }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    }

    // 运算符优先级  
    var priority = express.priority = {
      "+": 1,
      "-": 1,
      "*": 9,
      "/": 9,
      "%": 9
    };

    var cal = {
      "+": function (a, b) {
        return express.add(a, b);
      },
      "-": function (a, b) {
        return express.sub(a, b);
      },
      "*": function (a, b) {
        return express.mul(a, b);
      },
      "/": function (a, b) {
        return express.div(a, b);
      }
    };

    // 中缀表达式转后缀表达式  
    function c2a(exp) {
      exp = exp.replace(/\s+/g, "").match(/[1-9]\d{0,}(?:\.\d+)?|[\+\-\*\/\%]/g);
      var stack = [], result = [];
      stack.peek = function () {
        return this[this.length - 1];// 弹出但不删除  
      }

      for (var i = 0; i < exp.length; i++) {
        var v = exp[i];
        if (/[1-9]\d{0,}(?:\.\d+)?/.test(v)) {
          // 1.遇到操作数：直接输出（添加到后缀表达式中)  
          result.push(v);
        } else if (stack.length === 0) {
          // 2.栈为空时，遇到运算符，直接入栈  
          stack.push(v);
        } else if (v == "(") {
          // 3.遇到左括号：将其入栈  
          stack.push(v);
        } else if (v == ")") {
          // 4.遇到右括号：执行出栈操作，并将出栈的元素输出，直到弹出栈的是左括号，左括号不输出。  
          while (stack.peek() !== "(") {
            result.push(stack.peek())
            stack.pop();
            if (stack.length === 0) {
              return new Error("error expression"); // 缺少左括号  
            }
          }
          stack.pop();
        } else if (/[\+\-\*\/\%]/.test(v)) {
          // 5.遇到其他运算符：加减乘除：弹出所有优先级大于或者等于该运算符的栈顶元素，然后将该运算符入栈  
          while (priority[v] <= priority[stack.peek()]) {
            result.push(stack.peek())
            stack.pop();
          }
          stack.push(v);
        }
      }
      // 6.最终将栈中的元素依次出栈，输出。  
      while (stack.length > 0) {
        if (stack.peek() === '(') {
          return new Error("error expression"); // 缺少右括号  
        }
        result.push(stack.pop())
      }

      return result;
    }

    // 计算结果  
    function cc(queue) {
      var v, a, b, stack = [];
      while (queue.length > 0) {
        var v = queue.shift();
        if (/[1-9]\d{0,}(?:\.\d+)?/.test(v)) {
          stack.push(v)
        } else {
          b = stack.pop();
          a = stack.pop();
          if(a == undefined){
            return NaN;
          }
          if (b == undefined) {
            return NaN;
          }
          stack.push(cal[v](a, b));
        }
      }
      if (stack.length === 1) {
        return stack.pop();
      }

      return null;
    }

    return express;

  }(),
})