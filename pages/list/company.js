// pages/list/company.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    handlePath:'/Category/sjld',
    itemSelected:'1',
    lng:'22.9027434253',
    lat:'113.3843994141',
    groList: [],
    current_page: 1,
    last_page: 1,
    total: 1,
    area:'',
    classify:'',
    page:1,
    sort:'multiple',
    mflag:true,
    dflag:true,
    key:'',
    kflag:true,
    role:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if(options.key){
      this.setData({
        key:options.key
      })
    }

    wx.getLocation({
      success: function (res) {
        that.setData({
          lng:res.longitude,
          lat:res.latitude
        })
      },
    })
    this.data.page = 1;
    this.multipleSort();

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

  next() {
    if (this.data.page >= this.data.last_page) { return; }
    this.setData({
      page:++this.data.page
    })

    if(this.data.sort=='multiple'){

      this.setData({
        mflag:false
      })
      this.multipleSort();
    }else {
      this.setData({
        dflag: false
      })
      this.distanceSort();
    }
  },

  last() {
    if (this.data.page <= 1) { return; }
    this.setData({
      page: --this.data.page
    })
    if (this.data.sort == 'multiple') {
      this.setData({
        mflag: false
      })
      this.multipleSort();
    } else {
      this.setData({
        dflag: false
      })
      this.distanceSort();
    }
  },
  changeSelect(e) {
    this.setData({
      itemSelected: e.currentTarget.dataset.select
    })
  },

  multipleSort(e){
    var that=this;
    if(this.data.mflag){
      this.setData({
        page:1
      })
    }
    this.setData({
      mflag: true
    })

    if(this.data.sort=='distance'){
      this.setData({
        sort:'multiple',
        page:1
      })
    }
    if(e){
      this.setData({

        itemSelected: e.currentTarget.dataset.select,
      })
    }else {
      this.setData({
        itemSelected: 1,
      })
    }
    wx.request({
      url: app.globalData.apiUrl + '/index/category/multipleSort',
      data: {
        page: this.data.page,
        area: this.data.area,
        classify: this.data.classify,
        key:this.data.key,
        role:this.data.role
      },
      success: function (res) {
        that.setData({
          groList: res.data.data,
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          total: res.data.total,
        });
      },
    })

  },
  distanceSort(e){
    var that=this;
    if (this.data.dflag) {
      this.setData({
        page: 1
      })
    }
    this.setData({
      dflag: true
    })
    if (this.data.sort == 'multiple') {
      this.setData({
        sort: 'distance',
        page: 1
      })
    }
    if (e) {
      this.setData({
        itemSelected: e.currentTarget.dataset.select,
      })
    } else {
      this.setData({
        itemSelected: 2,
      })
    }
    wx.request({
      url: app.globalData.apiUrl+ '/index/category/distanceSort',
      data: {
        page: that.data.page,
        lng: that.data.lng,
        lat:that.data.lat,
        classify:that.data.classify,
        area:that.data.area,
        key:that.data.key,
        role:that.data.role
      },
      success: function (res) {
        that.setData({
          groList: res.data.data,
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          total: res.data.total,
        });
      }
    })
  },

  getCategory(e){
    this.setData({
      classify: e.detail.col2 || e.detail.col1 || e.detail.col0,
      page:1
    })
    this.multipleSort();
  },

  getArea(e){
    this.setData({
      area: e.detail.col2 || e.detail.col1 || e.detail.col0,
      page:1
    })
    this.multipleSort();
  },

  search(){
    wx.navigateTo({
      url: '/pages/user/search/search',
    })
  },

  moveToDetail(e){
    console.log(e);
    if(e.currentTarget.dataset.role=='teacher'){
      wx.navigateTo({
        url: '/pages/user/teacher/teacher?mobile=' + e.currentTarget.dataset.mobile,
      })
    }else {
      wx.navigateTo({
        url: '/pages/user/org/org?mobile=' + e.currentTarget.dataset.mobile,
      })
    }
  }

})
