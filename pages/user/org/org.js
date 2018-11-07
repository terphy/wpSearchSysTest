// pages/user/org/org.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoUrl:'',
    searchImgUrl:'',
    bgcimgUrl:'',
    introduce:'',
    head_photo:'',
    tell:'44533433534356353',
    tabs: ["简介", "课程", "评价","地图"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth: 0,
    mapheight: 400,
    latitude: 24,
    longitude: 110,
    scale: 10,
    markers: [{
      id: "1",
      latitude: 24,
      longitude: 110,
      width: 50,
      height: 50,
    }],
    lessons: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mobile: options.mobile
    })
    var that = this
    // 获取滑动块大小
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderWidth: res.windowWidth / that.data.tabs.length,
          mapheight: res.windowWidth,
          markers: [{
            id: "0",
            latitude: that.data.latitude,
            longitude: that.data.longitude,

          }],
        })
      }
    })
    wx.request({
      url: app.globalData.apiUrl+'/index/init/getUserInfo',
      data:{
        mobile:this.data.mobile
      },
      success:res=>{
        this.setData({
          introduce:res.data[0].introduce,
          latitude:res.data[0].lat,
          longitude:res.data[0].lng
        })
      }
    })
    wx.request({
      url: app.globalData.apiUrl + '/index/Init/init',
      success: res => {
        this.setData({
          lessons: res.data
        })
      }
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
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})
