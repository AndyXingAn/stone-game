var app = getApp();
Page( {
  data: {
    toast_hidden: true,
    openId:app.globalData.openId
  },
  onLoad: function( options ) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  //跳转到玩家显示页面
  goto_cust_show: function( opt ) {
    wx.redirectTo( { url: '../cust-show/cust-show' });
  },
  formSubmit: function( e ) {
    var that=this;
    console.log( e.detail.value );
    if( e.detail.value.homeNo == "" ) {
      this.setData( {
        toast_info: "请输入房间号",
        toast_hidden: false
      });
      return;
    }
    wx.request( {
      url: app.globalData.hostUrl + 'joinHome',
      header: {
        'Content-Type': 'application/json'
      },
      data: e.detail.value,
      success: function( res ) {
        if( res.data.retCode !== "0000" ) {
          that.setData( {
            toast_info: res.data.retInfo,
            toast_hidden: false
          });
          return;
        } else {
          that.setData( {
            toast_info: res.data.retInfo,
            toast_hidden: false
          });
        }
        console.log(  res );
        wx.redirectTo( {
          url: '../cust-show/cust-show?homeNo=' + res.data.data.homeNo
          + '&showWord=' + res.data.data.showWord
          + '&no=' + res.data.data.no
          + '&openId=' + app.globalData.openId
        });
      },
    });
  },
  toastChange: function(e) {
    this.setData( {
      toast_hidden: true
    });
  },
})