// app.js
App({
  globalData: {//全局变量
    userStatus:false
  },
  onLaunch: function () {
    wx.cloud.init({
      env: 'cloud1-1g1re6j0a64321a3',
      traceUser: true,
    }); 
  },
  getCloudOpenid: async function () {
    return this.openid = this.openid || (await wx.cloud.callFunction({name: 'login'})).result.openid
  },
  //最佳方案。
  getOpenid: async function () {
    (this.openid = this.openid || wx.getStorageSync('openid')) || wx.setStorageSync('openid', await this.getCloudOpenid())
    return this.openid
  }
});
