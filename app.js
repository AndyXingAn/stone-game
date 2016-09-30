//app.js
App({
  onLaunch: function () {
     //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData:{
    hasLogin:false,
    hostUrl:'http://127.0.0.1:9090/',
    openId:'1234567'
  }
})