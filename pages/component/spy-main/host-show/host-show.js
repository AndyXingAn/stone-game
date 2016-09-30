var app = getApp();
Page( {
  data: {
    disableInput: true,
    toast_hidden: true,
    toast_info: "请输入词汇"
  },
  onLoad: function( options ) {
    console.log( options );
    this.setData( {
      homeNo: options.homeNo,
      civilianWord: options.civilianWord,
      spyWord: options.spyWord,
      spyNo: options.spyNo,
      openId: options.openId,
      num: options.num
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
  toastChange: function() {//显示toast
    this.setData( {
      toast_hidden: true
    });
  },
  editInput: function() {//控制控件显示
    this.setData( {
      disableInput: false
    });
  },
  //获取随机词汇
  getword: function( e ) {
    var that = this;
    wx.request( {
      url: app.globalData.hostUrl + 'getRandomWord',
      header: {
        'Content-Type': 'application/json'
      },
      data: e.detail.value,
      success: function( res ) {
        if( res.data.retCode !== "0000" ) {
          that.setData( {
            toast_info: "服务端异常",
            toast_hidden: false
          });
          return;
        }
        that.setData( {
          toast_info: res.data.retInfo,
          toast_hidden: false
        });
        that.setData( {
          civilianWord: res.data.data.civilianWord,
          spyWord: res.data.data.spyWord
        });
      },
      fail: function( e ) {
        that.setData( {
          toast_info: "网络异常",
          toast_hidden: false
        })
      }
    });
  },
  formSubmit: function( e ) {//提交换词
    console.log( e.detail.value );
    var that = this;
    if( e.detail.value.civilianWord === "" || e.detail.value.spyWord === "" ) {
      this.setData( {
        toast_hidden: false
      });
      return;
    }
    wx.request( {
      url: app.globalData.hostUrl + 'create',
      header: {
        'Content-Type': 'application/json'
      },
      data: e.detail.value,
      success: function( res ) {
        if( res.data.retCode !== "0000" ) {
          that.setData( {
            toast_info: "服务端异常",
            toast_hidden: false
          });
          return;
        }

        that.setData( {
          toast_info: "更换成功",
          toast_hidden: false,
          homeNo: res.data.data.homeNo,
          civilianWord: res.data.data.civilianWord,
          spyWord: res.data.data.spyWord,
          spyNo: res.data.data.spyNo,
          disableInput: true
        });
      },
      fail: function( res ) {
        that.setData( {
          toast_info: "网络异常",
          toast_hidden: false
        });
      }
    });
  }
})