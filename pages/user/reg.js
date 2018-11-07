// pages/user/reg.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTap:false,
    identify:'获取验证码',
    countDownTime:5,
    color:'#1AAD19',
    isAgree:false,
    readed:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  getCode(){
    var self=this;
    if(!self.data.isTap){
      wx.request({
        url: app.globalData.apiUrl+'/index/user/getCode',
        data: {
          mobile:this.data.mobile
        },
        success:function(res){
          if(res.data.exist){
            wx.showToast({
              title: '该账号已注册！',
              icon: 'none'
            })
          }else {
            wx.showToast({
              title: '验证码已发送，请注意查收',
            });
          }
        }
      })
      self.setData({
        isTap: true
      });
      var currentTime=self.data.countDownTime;
      var originColor ='#1AAD19';
      var timer=setInterval(function(){
        if(currentTime<0){
          clearInterval(timer);
          self.setData({
            countDownTime: 5,
            identify: '获取验证码',
            isTap: false,
            color:'#1AAD19'
          });
        }else {
          self.setData({
            identify: currentTime + 's后再获取',
            countDownTime: currentTime - 1,
            color:'grey'
          });
          currentTime--;
        }
      },1000)
    }
  },
  setMobile(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  bindAgreeChange(){
    if(this.data.isAgree){
      this.setData({
        isAgree: false,
        readed:true
      });
    }else {
      this.setData({
        isAgree: true,
        readed: false
      });
    }
  },
  signUpSubmit(e){
    var that=this;
    if(this.data.isAgree){
      this.setData({
        readed:false
      });
      wx.request({
        url: app.globalData.apiUrl+'/index/user/reg',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          uinfo: JSON.stringify(e.detail.value)
        },
        success: function (res) {
          if (res.data.codeWrong) {
            wx.showToast({
              title: '验证码不正确！',
              icon: 'none'
            })
          } else if(res.data.exist){
            wx.showToast({
              title: '该账号已注册！',
              icon: 'none'
            })
          }else {
            wx.navigateTo({
              url: 'success?mobile='+that.data.mobile,
            })
          }
        }
      })
    }
  }
})