const db = wx.cloud.database();
const photographer = db.collection("photographer");
const order = db.collection("photographer-order");
import { Toast } from '../../dist/index';
Page({
  bottom() {
    Toast.show({
      position: 'bottom',
      message: '请同意协议后提交。',
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    userNameRules: {
      maxLength: {
        value: 6,
        message: '姓名最多6个字',
      },
      minLength: {
        value: 2,
        message: '姓名最少2个字',
      },
    },
    items1: [
      {
        text: '同意“影湛”获得您的信息以便与您联系。',
      },
    ],
    id:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    id = Number(id)
    let promise = photographer.where({
      able:true,
      rank:id
    }).get()
    promise.then(res => {
      this.setData({
        id: options.id,
        info : res.data[0]
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

   init(){
    var date=new Date();
    //年
      var year=date.getFullYear();
      //月
      var month=date.getMonth()+1;
      //日
      var day=date.getDate();
      //时
      var hh=date.getHours();
      //分
      var mm=date.getMinutes();
      //秒
      var ss=date.getSeconds();
      var rq=year+"年"+month+"月"+day+"日"+hh+":"+mm+":"+ss;
      return rq;
  },
  wussFormSubmit(e) {
    console.log('提交了:', e.detail);
    if (e.detail.checkbox.length===0) {
      this.bottom()
    }
    else{
      order.add({
        data:{
          photographerId:this.data.id,
          photographerHead:this.data.info.head,
          photographerName:this.data.info.name,
          price:this.data.info.price,
          xiadantime:this.init(),
          userName:e.detail.userName,
          mobile:e.detail.mobile,
          status:0
        }
      })
      wx.redirectTo({
        url: '../success/success',
      })
    }
  },
  wussFormReset(e) {
    console.log('重置了:', e.detail);
  }
})