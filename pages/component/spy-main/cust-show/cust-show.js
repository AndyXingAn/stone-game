var app = getApp();
Page( {
  data: {
    toast_hidden: true,
    openId:app.globalData.openId
  },
  onLoad: function( options ) {
    this.setData( {
      homeNo: options.homeNo,
      no: options.no,
      showWord: options.showWord
    });
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
  changeWord: function() {
    var that = this;
    wx.request( {
      url: app.globalData.hostUrl + 'joinHome',
      header: {
        'Content-Type': 'application/json'
      },
      data: { 
          openId: app.globalData.openId,
          homeNo:this.data.homeNo
        },
      success: function( res ) {
        if( res.data.retCode !== "0000" ) {
          that.setData( {
            toast_info: res.data.retInfo,
            toast_hidden: false
          });
          return;
        } else {
          that.setData( {
            toast_info: "更换成功！",
            toast_hidden: false
          });
        }
        console.log( res );
        that.setData( {
          homeNo: res.data.data.homeNo,
          no: res.data.data.no,
          showWord: res.data.data.showWord
        });
      },
    });
  },
  toastChange: function(e) {
    this.setData( {
      toast_hidden: true
    });
  }
})