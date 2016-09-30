//logs.js
var util = require( '../../../../utils/util.js' )
var app = getApp();
var pageData = {}
pageData.data = {
  toast_hidden: true,
  toast_info: "词汇不能为空",
  openId: app.globalData.openId
}
pageData[ 'onLoad' ] = function( options ) {
  //页面加载完毕
}
pageData[ 'toastChange' ] = function( e ) {
  this.setData( {
    toast_hidden: true
  });
}

pageData[ 'formSubmit' ] = function( e ) {
  var that = this;
  if( e.detail.value.civilianWord === "" || e.detail.value.spyWord === "" ) {
    this.setData( {
      toast_hidden: false
    });
    return;
  }
  if( isChn( e.detail.value.civilianWord ) ) {
    this.setData( {
      toast_info: "请输入中文",
      toast_hidden: false
    });
    return;
  }
  if( isChn( e.detail.value.spyWord ) ) {
    this.setData( {
      toast_info: "请输入中文",
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
      wx.redirectTo( {
        url: '../host-show/host-show?homeNo=' + res.data.data.homeNo
        + '&civilianWord=' + res.data.data.civilianWord
        + '&spyWord=' + res.data.data.spyWord
        + '&spyNo=' + res.data.data.spyNo
        + '&openId=' + app.globalData.openId
        + '&num=' + e.detail.value.num
      });
    },
    fail: function( e ) {
      that.setData( {
        toast_info: "网络异常",
        toast_hidden: false
      })
    }
  });
};
//获取随机词汇
pageData[ 'getword' ] = function( e ) {
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
}
pageData[ 'formReset' ] = function( e ) {
  console.log( 'form发生了reset事件，携带数据为：', e.detail.value )
  this.setData( {
    chosen: ''
  })
}
//判断是否中文
function isChn( str ) {
  var reg = /^[u4E00-u9FA5]+$/;
  if( !reg.test( str ) ) {
    return false;
  }
  return true;
}
Page( pageData )