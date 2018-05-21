
const app = getApp()
var objectBJ = app.globalData.countries;
var result = objectBJ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: objectBJ,
    inputShowed: false,
    inputVal: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    result = objectBJ;
    this.setData({
      isF: options.isF.split(",")
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  //绑定键盘数据
  bindBtnClick: function (e) {
    var that = this;
    var pages = getCurrentPages()
    //给上一个页面设置状态
    var curPage = pages[pages.length - 2];

    var currentIndex = e.target.dataset.key;
    var currentItem = result[currentIndex];
    var contryF = 0;

    for(var i = 0 ; i < objectBJ.length ; i++){
      if (currentItem['id'] == objectBJ[i]['id']){
        contryF = i;
        break;
      }
    }

    if(that.data.isF == 1){
      curPage.setData({
        contryF: contryF,
        // priceF: null,
        // priceT: 0.00,
      });
    }
    else{
      curPage.setData({
        contryT: contryF,
        // priceF: null,
        // priceT: 0.00,
      });
    }
    curPage.pickerChange()
    wx.navigateBack();
  },
  
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    var text = e.detail.value;
    result = new Array();
    for (var i = 0; i < objectBJ.length ; i++){
      var item = objectBJ[i];
      if (item['id'].toLowerCase().indexOf(text.toLowerCase()) != -1 || item['name'].indexOf(text) != -1){
        result.push(item);
      }
    }
    this.setData({
      inputVal: text,
      array:result,
    });
  }
})