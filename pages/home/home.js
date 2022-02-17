// pages/commodity/commodity.js
const db = wx.cloud.database();
const collections = db.collection("swiper").orderBy('no','asc');
const collect = db.collection("post").orderBy('no','asc');
const village = db.collection("hot-village");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 1200, 
    snaptoedge: false,
		circular: true,
    previous_margin: 0,
    next_margin: 0,
    easy_function:"easeInOutCubic" 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo.length!=0){
      let app =  getApp();
      app.globalData.userStatus = true;
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let promise = collections.where({able:true}).get()
    promise.then(res => {
      this.setData({
      a : res.data
      })
    });
    let promise1 = collect.where({able:true}).get()
    promise1.then(res => {
      this.setData({
      post : res.data
      })
    });
    let promise2 = village.get()
    promise2.then(res => {
      this.setData({
      village : res.data
      })
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&  this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0     //这里的数字设置当前页面在tabbar里对应的序列，从0开始
      })
    }


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

  }
})