// custom-tab-bar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
 
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: "black",
    selectedColor: "#7A7E83",
    list: [
      {
        "pagePath": "/pages/home/home",
        "iconPath": "../images/tabbar/首页.png",
        "selectedIconPath": "../images/tabbar/filled/首页.png",
        "text": "首页"
      }, {
        "pagePath": "/pages/commodity/commodity",
        "iconPath": "../images/tabbar/选购.png",
        "selectedIconPath": "../images/tabbar/filled/选购.png",
        "text": "选购"
      },
      {
        "pagePath": "/pages/order/order",
        "iconPath": "../images/tabbar/订单.png",
        "selectedIconPath": "../images/tabbar/filled/订单.png",
        "text": "订单"
      },
      {
        "pagePath": "/pages/mine/mine",
        "iconPath": "../images/tabbar/我的.png",
        "selectedIconPath": "../images/tabbar/filled/我的.png",
        "text": "我的"
      }]
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url:url })
      this.setData({
        selected: data.index
      })
    }
  }
})
 


