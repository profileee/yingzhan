Page({
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('获取用户个人信息',res.userInfo)
        wx.setStorageSync("userInfo", res.userInfo)
        wx.navigateBack({
          delta: 1,
        })
        let app =  getApp();
        app.globalData.userStatus = true;
        wx.showToast({
          title: '登录成功！',
          icon: 'success',
          mask: true,
          duration: 1000
        })
      }
    })
  }
})

