//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    countries: [
      { "id": "ALL", "name": "阿尔巴尼亚列克" },
      { "id": "DZD", "name": "阿尔及利亚第纳尔" },
      { "id": "AFN", "name": "阿富汗尼" },
      { "id": "ARS", "name": "阿根廷披索" },
      { "id": "AED", "name": "阿联酋迪拉姆" },
      { "id": "AWG", "name": "阿鲁巴盾" },
      { "id": "OMR", "name": "阿曼里亚尔" },
      { "id": "AZN", "name": "阿塞拜疆新马纳特" },
      { "id": "EGP", "name": "埃及镑" },
      { "id": "ETB", "name": "埃塞俄比亚比尔" },
      { "id": "AOA", "name": "安哥拉宽扎" },
      { "id": "AUD", "name": "澳大利亚元" },
      { "id": "MOP", "name": "澳门币" },
      { "id": "BBD", "name": "巴巴多斯元" },
      { "id": "BSD", "name": "巴哈马元" },
      { "id": "PKR", "name": "巴基斯坦卢比" },
      { "id": "PYG", "name": "巴拉圭瓜拉尼" },
      { "id": "BHD", "name": "巴林第纳尔" },
      { "id": "PAB", "name": "巴拿马巴波亚" },
      { "id": "BRL", "name": "巴西雷亚尔" },
      { "id": "BYR", "name": "白俄罗斯卢布" },
      { "id": "BMD", "name": "百慕大元" },
      { "id": "BGN", "name": "保加利亚列瓦" },
      { "id": "ISK", "name": "冰岛克朗" },
      { "id": "PLN", "name": "波兰兹罗提" },
      { "id": "BAM", "name": "波斯尼亚和黑塞哥维那可" },
      { "id": "BOB", "name": "玻利维亚诺" },
      { "id": "BZD", "name": "伯利兹元" },
      { "id": "BWP", "name": "博茨瓦纳普拉" },
      { "id": "BTN", "name": "不丹努扎姆" },
      { "id": "BIF", "name": "布隆迪法郎" },
      { "id": "KPW", "name": "朝鲜元" },
      { "id": "DKK", "name": "丹麦克朗" },
      { "id": "XCD", "name": "东加勒比元" },
      { "id": "DOP", "name": "多米尼加比索" },
      { "id": "RUB", "name": "俄罗斯卢布" },
      { "id": "ERN", "name": "厄立特里亚" },
      { "id": "PHP", "name": "菲律宾比索" },
      { "id": "FJD", "name": "斐济元" },
      { "id": "CVE", "name": "佛得角埃斯库多" },
      { "id": "FKP", "name": "福克兰群岛镑" },
      { "id": "GMD", "name": "冈比亚达拉西" },
      { "id": "CDF", "name": "刚果法郎" },
      { "id": "HKD", "name": "港币" },
      { "id": "COP", "name": "哥伦比亚比索" },
      { "id": "CRC", "name": "哥斯达黎加科朗" },
      { "id": "GEL", "name": "格鲁吉亚拉里" },
      { "id": "CUP", "name": "古巴比索" },
      { "id": "GYD", "name": "圭亚那元" },
      { "id": "KZT", "name": "哈萨克斯坦坚戈" },
      { "id": "HTG", "name": "海地古德" },
      { "id": "KRW", "name": "韩国元" },
      { "id": "ANG", "name": "荷兰盾" },
      { "id": "HNL", "name": "洪都拉斯伦皮拉" },
      { "id": "XAU", "name": "黄金" },
      { "id": "DJF", "name": "吉布提法郎" },
      { "id": "KGS", "name": "吉尔吉斯索姆" },
      { "id": "GNF", "name": "几内亚法郎" },
      { "id": "CAD", "name": "加拿大元" },
      { "id": "GHS", "name": "加纳塞地" },
      { "id": "KHR", "name": "柬埔寨瑞尔" },
      { "id": "CZK", "name": "捷克克朗" },
      { "id": "ZWL", "name": "津巴布韦元" },
      { "id": "QAR", "name": "卡塔尔里亚尔" },
      { "id": "KYD", "name": "开曼群岛元" },
      { "id": "KMF", "name": "科摩罗法郎" },
      { "id": "KWD", "name": "科威特第纳尔" },
      { "id": "HRK", "name": "克罗地亚库纳" },
      { "id": "KES", "name": "肯尼亚先令" },
      { "id": "LVL", "name": "拉脱维亚拉特" },
      { "id": "LSL", "name": "莱索托洛提" },
      { "id": "LAK", "name": "老挝基普" },
      { "id": "CNH", "name": "离岸人民币" },
      { "id": "LBP", "name": "黎巴嫩镑" },
      { "id": "LTL", "name": "立陶宛立特" },
      { "id": "LRD", "name": "利比里亚元" },
      { "id": "LYD", "name": "利比亚第纳尔" },
      { "id": "RWF", "name": "卢旺达法郎" },
      { "id": "RON", "name": "罗马尼亚列伊" },
      { "id": "MGA", "name": "马达加斯加阿里亚里" },
      { "id": "MVR", "name": "马尔代夫拉菲亚" },
      { "id": "MWK", "name": "马拉维克瓦查" },
      { "id": "MYR", "name": "马来西亚林吉特" },
      { "id": "MKD", "name": "马其顿第纳尔" },
      { "id": "MUR", "name": "毛里求斯卢比" },
      { "id": "MRO", "name": "毛里塔尼亚乌吉亚" },
      { "id": "USD", "name": "美元" },
      { "id": "MNT", "name": "蒙古图格里克" },
      { "id": "BDT", "name": "孟加拉国塔卡" },
      { "id": "PEN", "name": "秘鲁新索尔" },
      { "id": "MMK", "name": "缅元" },
      { "id": "MDL", "name": "摩尔多瓦列伊" },
      { "id": "MAD", "name": "摩洛哥迪拉姆" },
      { "id": "MZN", "name": "莫桑比克梅蒂卡尔" },
      { "id": "MXN", "name": "墨西哥比索" },
      { "id": "NAD", "name": "纳米比亚元" },
      { "id": "ZAR", "name": "南非兰特" },
      { "id": "NPR", "name": "尼泊尔卢比" },
      { "id": "NIO", "name": "尼加拉瓜科多巴" },
      { "id": "NGN", "name": "尼日利亚第纳尔" },
      { "id": "NOK", "name": "挪威克朗" },
      { "id": "EUR", "name": "欧元" },
      { "id": "CNY", "name": "人民币" },
      { "id": "JPY", "name": "日元" },
      { "id": "SEK", "name": "瑞典克朗" },
      { "id": "CHF", "name": "瑞士法郎" },
      { "id": "SVC", "name": "萨尔瓦多科朗" },
      { "id": "WST", "name": "萨摩亚塔拉" },
      { "id": "RSD", "name": "塞尔维亚第纳尔" },
      { "id": "SLL", "name": "塞拉利昂利昂" },
      { "id": "SCR", "name": "塞舌尔卢比" },
      { "id": "SAR", "name": "沙特阿拉伯里亚尔" },
      { "id": "STD", "name": "圣多美多布拉" },
      { "id": "SHP", "name": "圣赫勒拿镑" },
      { "id": "LKR", "name": "斯里兰卡卢比" },
      { "id": "SZL", "name": "斯威士兰里兰吉尼" },
      { "id": "SDG", "name": "苏丹镑" },
      { "id": "SRD", "name": "苏里南元" },
      { "id": "SBD", "name": "所罗门群岛元" },
      { "id": "SOS", "name": "索马里先令" },
      { "id": "TJS", "name": "塔吉克斯坦索莫尼" },
      { "id": "TWD", "name": "台币" },
      { "id": "XPF", "name": "太平洋法郎" },
      { "id": "THB", "name": "泰铢" },
      { "id": "TZS", "name": "坦桑尼亚先令" },
      { "id": "XDR", "name": "特别提款权（国际货币基金）" },
      { "id": "TTD", "name": "特立尼达和多巴哥元" },
      { "id": "TND", "name": "突尼斯第纳尔" },
      { "id": "TRY", "name": "土耳其里拉" },
      { "id": "TMT", "name": "土库曼斯坦马纳特" },
      { "id": "VUV", "name": "瓦努阿图瓦图" },
      { "id": "GTQ", "name": "危地马拉格查尔" },
      { "id": "VEF", "name": "委内瑞拉玻利瓦尔" },
      { "id": "BND", "name": "文莱元" },
      { "id": "UGX", "name": "乌干达先令" },
      { "id": "UAH", "name": "乌克兰格里夫纳" },
      { "id": "UYU", "name": "乌拉圭比索" },
      { "id": "UZS", "name": "乌兹别克斯坦索姆" },
      { "id": "XOF", "name": "西非法郎" },
      { "id": "PGK", "name": "新几内亚基那基那" },
      { "id": "SGD", "name": "新加坡元" },
      { "id": "NZD", "name": "新西兰元" },
      { "id": "HUF", "name": "匈牙利福林" },
      { "id": "SYP", "name": "叙利亚镑" },
      { "id": "JMD", "name": "牙买加元" },
      { "id": "AMD", "name": "亚美尼亚德拉姆" },
      { "id": "YER", "name": "也门里亚尔" },
      { "id": "IQD", "name": "伊拉克第纳尔" },
      { "id": "IRR", "name": "伊朗里亚尔" },
      { "id": "ILS", "name": "以色列谢克尔" },
      { "id": "INR", "name": "印度卢比" },
      { "id": "IDR", "name": "印度尼西亚盾" },
      { "id": "GBP", "name": "英镑" },
      { "id": "JOD", "name": "约旦第纳尔" },
      { "id": "VND", "name": "越南盾" },
      { "id": "ZMW", "name": "赞比亚克瓦查" },
      { "id": "GIP", "name": "直布罗陀镑" },
      { "id": "CLF", "name": "智利比索" },
      { "id": "CLP", "name": "智利比索" },
      { "id": "XAF", "name": "中非法郎" }
    ],
    countries2: [
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
    ]
  }
})