//index.js
var object = {
  data: {
    list: [
      {
        id: 'whospy',
        name: '谁是卧底',
        open: false,
        page: 'spy-main'
      }
      //, {
      //   id: 'shutdown',
      //  name: '天黑请闭眼'
      //  }
    ]
  },
  goto_game: function( opt ) {//跳转到不同游戏
    var goto_url = opt.target.dataset.url + '/' + opt.target.dataset.url;
    wx.navigateTo(
       {
          url: goto_url 
    });
  }
};
Page( object )
