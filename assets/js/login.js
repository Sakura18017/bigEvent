$(function () {
  $('#login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  $('#reg').on('click', function () {
    $('.reg-box').show()
    $('.login-box').hide()

  })


  var form = layui.form
  var layer = layui.layer;
  // 表单验证
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能出现空格'],

    repwd: function (value) {
      var ppwd = $('.reg-box [name=password]').val()
      if (ppwd != value) {
        return '两次密码不一致'
      }
    }
  })

  var data
  // var link = 'http://ajax.frontend.itheima.net'
  // 调用注册接口
  $('.reg-box').on('submit', function (e) {
    // 禁用默认行为
    e.preventDefault()

    data = {
      username: $('.reg-box [name=username]').val(),
      password: $('.reg-box [name=password]').val()
    }

    $.post('/api/reguser', data, function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      console.log(res.status);
      layer.msg(res.message);
      $('#login').click()

    })

  })


  // 调用登录接口
  $('.login-box').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'post',
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res.status);
        if (res.status !== 0) {
          return layer.msg('登录失败');
        }
        layer.msg('登陆成功');
        // console.log(res);
        localStorage.setItem('token', res.token)
        location.href = '/index.html'

      }
    })

  })
})