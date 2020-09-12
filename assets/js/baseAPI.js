  $.ajaxPrefilter(function(options){
    // console.log(options);

    // console.log(options.url);
    options.url = 'http://ajax.frontend.itheima.net'+ options.url
    if (options.url.indexOf('/my/') !== -1) {
      // 请求头   因为这是一个有权限的接口  为了防止报错，所以添加了''
      options.headers = {
        Authorization:localStorage.getItem('token')||''
      }
    }

    

  })