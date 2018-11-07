// pages/user/my/my.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mutilArray: [],
    multiIndex: [0, 0, 0],
  },
  test(){

  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    wx.request({
      url: app.globalData.apiUrl + '/index/category/sjld',
      success: function (res) {
        console.log(res.data);
        that.setData({
          multiArray: res.data.all_data
        })
        var mutilArraya = [];
        mutilArraya.push(res.data.first_cate);
        var second_catea=[];
        Object.keys(res.data.second_cate).forEach(function(key){
          second_catea[key] = res.data.second_cate[key];
        })
        mutilArraya.push(second_catea[0]);
        mutilArraya.push(res.data.third_cate[0][0]);
        that.setData({
          first_cate: res.data.first_cate,
          second_cate: second_catea,
          third_cate: res.data.third_cate,
        })
        console.log(that.data.mutilArray);
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
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
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
        switch (data.multiIndex[0]) {
          case 0:
            if (this.data.second_cate[0]) {
              data.multiArray[1] = this.data.second_cate[0];
              if (this.data.third_cate[0]){
                data.multiArray[2] = this.data.third_cate[0][0];
              }else {
                data.multiArray[2]=[]
              }
            } else {
              data.multiArray[1] = [];
            }
            break;
          case 1:
            if (this.data.second_cate[1]) {
              data.multiArray[1] = this.data.second_cate[1];
              if (this.data.third_cate[1]) {
                data.multiArray[2] = this.data.third_cate[1][1];
              } else {
                data.multiArray[2]=[]
              }
            } else {
              data.multiArray[1] = [];
            }
            break;
          case 2:
            if (this.data.second_cate[2]) {
              data.multiArray[1] = this.data.second_cate[2];
              if (this.data.third_cate[2]) {
                data.multiArray[2] = this.data.third_cate[2][2];
              } else {
                data.multiArray[2] = []
              }
            } else {
              data.multiArray[1] = [];
            }
            break;
          case 3:
            if (this.data.second_cate[3]) {
              data.multiArray[1] = this.data.second_cate[3];
              if (this.data.third_cate[3]) {
                data.multiArray[2] = this.data.third_cate[3][3];
              } else {
                data.multiArray[2] = []
              }
            } else {
              data.multiArray[1] = [];
            }
            break;
          case 4:
            if (this.data.second_cate[4]) {
              data.multiArray[1] = this.data.second_cate[4];
              if (this.data.third_cate[4]) {
                data.multiArray[2] = this.data.third_cate[4][4];
              } else {
                data.multiArray[2] = []
              }
            } else {
              data.multiArray[1] = [];
            }
            break;
          case 5:
            if (this.data.second_cate[5]) {
              data.multiArray[1] = this.data.second_cate[5];
              if (this.data.third_cate[5]) {
                data.multiArray[2] = this.data.third_cate[5][5];
              } else {
                data.multiArray[2] = []
              }
            } else {
              data.multiArray[1] = [];
            }
            break;
          case 6:
            if (this.data.second_cate[6]) {
              data.multiArray[1] = this.data.second_cate[6];
              if (this.data.third_cate[6]) {
                data.multiArray[2] = this.data.third_cate[6][6];
              } else {
                data.multiArray[2] = []
              }
            } else {
              data.multiArray[1] = [];
            }
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                if (this.data.third_cate[0][1]){
                  data.multiArray[2] = this.data.third_cate[0][0];
                }else {
                  data.multiArray[2] =[];
                }
                break;
              case 1:
                if (this.data.third_cate[0][1]) {
                  data.multiArray[2] = this.data.third_cate[0][1];
                } else {
                  data.multiArray[2] = [];
                }
                break;
              case 2:
                if (this.data.third_cate[0][2]) {
                  data.multiArray[2] = this.data.third_cate[0][2];
                } else {
                  data.multiArray[2] = [];
                }
                break;
              case 3:
                if (this.data.third_cate[0][3]) {
                  data.multiArray[2] = this.data.third_cate[0][3];
                } else {
                  data.multiArray[2] = [];
                }
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
})
