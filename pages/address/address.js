// pages/address/address.js
const db = wx.cloud.database();
Page({
  add(){
    wx.chooseAddress({
      success: (result) => {
        console.log(result)
        db.collection('address').add({
          data:{

            address:result
          }
        })
      },
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    console.log(this.openid = await getApp().getOpenid())
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
    const address = db.collection('address').where({_openid:this.openid}).get()
    address.then(res=>{
      this.setData({
        address: res.data[0].address
      })
      console.log(this.data.address)
    })
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