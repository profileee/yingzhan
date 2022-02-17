const db = wx.cloud.database();
const order0 = db.collection("photographer-order");
Page({
  data: {
    tabs3: [
      {
        text: '全部',
        id:0
      },
      {
        text: '待确认',
        id:1
      },
      {
        text: '待完成',
        id:2
      },
      {
        text: '待评价',
        id:3
      },
    ],
  },

  onLoad: async function (options) {
    this.openid = await getApp().getOpenid()
    console.log(this.openid)
    let order = order0.where({
        _openid:this.openid,
        status: 0
    }).get()
    order.then(res => {
      this.setData({
        order0:res.data
      })
      console.log(res.data)
    });
  },


  handleChange(e) {
    const index = e.detail.index;
    console.log(e);
  },
  handleSelected() {
    this.setData({
      index: 2,
    });
  },
  handleClick(e) {
    const { index, title } = e.detail;
    console.log('点击了tab:' + index, title);
  },
  onDisabled(e) {
    const { index, title } = e.detail;
    console.log('点击了禁用的:' + index, title);
  },
});
