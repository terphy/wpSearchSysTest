// pages/user/perSetting/identify.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '1234567891G',
    region: ['广东省', '广州市', '番禺区'],
    province: '广东省',
    city: '广州市',
    area: '番禺区',
    role: 'company',
    items: [{
      name: 'teacher',
      value: '教师'
    },
    {
      name: 'company',
      value: '机构',
      checked: 'true'
    },
    ],

    name: "",

    introduce: "",

    textCounter: 0,
    limit: 250,

    picNum: 0,
    files: [],

    address: null,
    latitude: null,
    longitude: null,


    multilArray: [],
    multiIndex: [0, 0, 0],
    handlePath: '/Category/sjld',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mobile:options.mobile
    })
    var that = this
    wx.request({
      url: app.globalData.apiUrl + '/index/category/sjld',
      success: function (res) {

        console.log(res.data);
        var second_catea = [];
        var a=[];
        a.push(res.data.first_cate);
        a.push(res.data.second_cate[0]);
        a.push(res.data.third_cate[0][0]);
        var good_at=a[0][0]+a[1][0]+a[2][0];
        that.setData({
          first_cate: res.data.first_cate,
          second_cate: second_catea,
          third_cate: res.data.third_cate,
          multiArray:a,
          good_at:good_at
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


  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      area: e.detail.value[2],
    })
  },


  roleChange(e) {
    this.setData({
      role: e.detail.value
    })
  },


  chooseLocation() {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },


  setName(e) {
    var nospace = e.detail.value.replace(/\s+/g, "")
    this.setData({
      name: nospace
    })
  },


  setintroduce(e) {
    this.setData({
      introduce: e.detail.value,
      textCounter: e.detail.value.length,
    })
  },


  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          files: that.data.files.concat(res.tempFilePaths),
          picNum: that.data.picNum + 1
        });
      }
    })
  },

  /**
   * 上传到数据库
   */
  saveIntoDB() {
    var that = this
    if (that.data.name.length == 0) {
      wx.showToast({
        title: '请输入名称',
      })
    } else if (that.data.files.length < 2) {
      wx.showToast({
        title: '请选择两张图片'
      })
    } else if (that.data.role == "company" && !that.data.address) {
      wx.showToast({
        title: '请选取位置',
      })
    } else {

      for (var i = 0; i < that.data.files.length; i++) {
        wx.uploadFile({
          url: app.globalData.apiUrl + '/index/Identificate/uploadImg',
          filePath: that.data.files[i],
          name: 'image',
          method: 'post',
          formData: {
            'picNum': i + 1,
            'mobile': that.data.mobile
          }
        })
      }

      wx.request({
        url: app.globalData.apiUrl + '/index/Identificate/uploadChars',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          mobile: that.data.mobile,
          role: that.data.role,
          name: that.data.name,
          introduce: that.data.introduce,
          address: that.data.address,
          latitude: that.data.latitude,
          longitude: that.data.longitude,
          good_at:that.data.good_at
        },
      })
        wx.navigateTo({
          url: '/pages/list/company',
        })
    }
  },



  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    var multiArray=this.data.multiArray;
    var multiIndex=this.data.multiIndex;
    var good_at = multiArray[0][multiIndex[0]] + multiArray[1][multiIndex[1]] + multiArray[2][multiIndex[2]];
    this.setData({
      good_at:good_at
    });
  },


  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    console.log(this.data.third_cate[0]);
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        var index = data.multiIndex[0];
        if (this.data.second_cate[index]) {
          data.multiArray[1] = this.data.second_cate[index];
          if (this.data.third_cate[index]) {
            data.multiArray[2] = this.data.third_cate[index][index];
          } else {
            data.multiArray[2] = []
          }
        } else {
          data.multiArray[1] = [];
        }

        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        var columnIndex0 = data.multiIndex[0];
        var columnIndex1 = data.multiIndex[1];
        if (this.data.third_cate[columnIndex0] && this.data.third_cate[columnIndex0][columnIndex1]) {
          data.multiArray[2] = this.data.third_cate[columnIndex0][columnIndex1];
        } else {
          data.multiArray[2] = [];
        }
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },
})
