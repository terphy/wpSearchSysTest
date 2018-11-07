// pages/user/success.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 头像
    headPhoto: null,
    // 默认头像
    defaultUrl: '/src/img/default.jpg',
    mobile: '',
    role: '',
    region: '',
    province: '',
    city: '广州市',
    area: '番禺区',
    mobile:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      mobile:options.mobile
    });
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


  setPhotoInfo() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      success: function(res) {
        var path = res.tempFilePaths[0];
        that.setData({
          headPhoto: path
        });
        wx.uploadFile({
          url: app.globalData.apiUrl + '/index/Identificate/uploadImg',
          filePath: that.data.headPhoto,
          name: 'image',
          method: 'post',
          formData: {
            'picNum': 0,
            'mobile': that.data.mobile
          }
        })
      },
    });
  },


  bindPickerCity(e) {
    var that=this
    that.setData({
      region: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      area: e.detail.value[2],
    })
    wx.request({
      url: app.globalData.apiUrl + '/index/Identificate/uploadRegion',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        mobile: that.data.mobile,
        province: that.data.province,
        city: that.data.city,
        area: that.data.area,
      },
    })
  },


  pageJump() {
    var that = this
    if (!that.data.role) {
      wx.navigateTo({
        url: './perSetting/identify?mobile=' + that.data.mobile,
      })
    } else if (that.data.role == 'teacher') {
      wx.navigateTo({
        url: '/pages/user/teacher/teacher?mobile=' + that.data.mobile,
      })
    } else {
      wx.navigateTo({
        url: '/pages/user/org/org?mobile=' + that.data.mobile,
      })
    }
  },

})
