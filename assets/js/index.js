$(function () {

  // 获取用户基本信息
  getUserInfo()

  function getUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',

      success: function (res) {
        // console.log(res);
        if (res.status != 0) {
          return layui.layer.msg('获取用户信息失败')
        }
        renderAvatar(res.data)
        // console.log(res);
      },
      complete: function (res) {
        // console.log(res);
        if (res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败！') {
          //清除token
          localStorage.removeItem('token')
          // 转跳到登录页面
          location.href = '/login.html'
        }
      }
    })
  }

  $('.logout').on('click', function () {
    layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
      //清除token
      localStorage.removeItem('token')
      // 转跳到登录页面
      location.href = '/login.html'
      layer.close(index);
    });
  })

})


// 渲染用户头像
function renderAvatar(user) {
  // console.log(user);
  // 判断是否有昵称,如果没有的话就显示注册时的用户名
  var name = user.nickname || user.username;
  $('.welcome').html('欢迎&nbsp' + name)

  // 判断是否有头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('url', user.user_pic).show()
    $('.usertx').hide()
  } else {
    var first = name[0].toUpperCase()
    $('.usertx').html(first).show()
    $('.layui-nav-img').hide()
  }
}
