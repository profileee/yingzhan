import { Toast } from '../../dist/index';
Page({
  bottom() {
    Toast.show({
      position: 'bottom',
      message: '请同意协议后提交。',
    });
  },
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
  },
  wussFormSubmit(e) {
    console.log('提交了:', e.detail);
    if (e.detail.checkbox.length===0) {
      this.bottom()
    }
  },
  wussFormReset(e) {
    console.log('重置了:', e.detail);
  },
});
