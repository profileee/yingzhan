const db = wx.cloud.database();
const app = getApp();
import { Toast } from '../../dist/index';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: ''
  },

  noLogin(){
    Toast.show({
      position: 'bottom',
      message: '请先登录',
    });
  },

  gotoLogin (){
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.setStorageSync("userInfo", res.userInfo)
        this.setData({
          userInfo:res.userInfo
        })
        app.globalData.userStatus = true;
        db.collection('users').add({
          data:{
            openid: this.openid,
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          }
        })
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          mask: true,
          duration: 1000
        })
      }
    })
  },
  logout (){
    wx.showModal({
      title: '提示',
      content: '确定退出登录吗？',
      success: res=>{
        if (res.confirm) {
          wx.setStorageSync('userInfo', '')
          this.setData({
          userInfo:''
          })
          app.globalData.userStatus = false;
        }
      }
    })
  },
  zhuxiao (){
    wx.showModal({
      title: '注销账号' ,
      content:'注销账号将删除所有账户数据，确认继续吗？',
      success: res=>{
        if (res.confirm) {
          wx.setStorageSync('userInfo', '')
          wx.setStorageSync('openid', '')
          this.setData({
          userInfo:''
          }),
          app.globalData.userStatus = false;
          db.collection('users').where({_openid: this.openid}).remove({
            success:()=>{
              db.collection('address').where({_openid: this.openid}).remove({
                success(){
                  wx.showToast({
                    title: '注销成功'
                  })
                }
              })
            },
            fail:()=>{
              wx.showToast({
                title: '注销失败',
                icon: 'error'
              })
            }
          })
        }
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    this.openid = await getApp().getOpenid()
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo
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
    if (typeof this.getTabBar === 'function' &&  this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3     //这里的数字设置当前页面在tabbar里对应的序列，从0开始
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