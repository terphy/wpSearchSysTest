Page({

  /**
   * 页面的初始数据
   */
  data: {

    inputFocus: false,

    width: 74,

    searchStr: "",

    hotSeach: [{
        id: 0,
        value: '中小学编导'
      },
      {
        id: 1,
        value: '少儿英语'
      },
      {
        id: 2,
        value: '雅思'
      },
      {
        id: 3,
        value: '托福'
      },
      {
        id: 4,
        value: '中小学早教编导'
      },
      {
        id: 5,
        value: '会计证'
      },
      {
        id: 6,
        value: '建造师'
      },
      {
        id: 7,
        value: '化妆'
      },
      {
        id: 8,
        value: '韩语'
      },
      {
        id: 9,
        value: '日语'
      },
    ],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 搜索框聚焦,input里的内容移动动画
   */
  focus() {
    this.setData({
      width: 0,
      inputFocus: true
    })
  },



  inputKey(e) {
    this.setData({
      searchStr: e.detail.value
    })
  },


  reset() {
    this.setData({
      searchStr: ""
    })
  },


  doSearch() {
    var that = this

    var key = that.data.searchStr
    key = key.replace(/\s+/g, "")
    that.goSearch(that.data.searchStr)
  },

  pageBack() {
    wx: wx.navigateBack({
      delta: 1,
    })
  },

  clickHotWord(e) {
    var id = e.currentTarget.id
    var key = this.data.hotSeach[id].value
    this.goSearch(key)
  },


  clickHistory(e) {
    var id = e.currentTarget.id
    var key = this.data.inputHistory[id].value
    this.goSearch(key)
  },


  goSearch(par) {
    wx.navigateTo({
      url: '/pages/list/company?key='+par,
    })
  }
})
