var form = layui.form
var layer = layui.layer;
// 表单验证
form.verify({

  pwd: [
    /^[\S]{6,12}$/
    , '密码必须6到12位，且不能出现空格'
  ],

  npwd: function (value) {
    var old = $('.layui-form [name=oldPwd]').val()
    if (old === value) {
      return '新旧密码不能相同'
    }
  }

  ,

  repwd: function (value) {
    var npwd = $('.layui-form [name=newPwd]').val()
    if (npwd !== value) {
      return '两次密码不一致'
    }
  }
})

$(function () {
  // 重置密码
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message)
        }

        $('.layui-form')[0].reset()
        localStorage.removeItem('token')
        top.window.location.href = '/login.html'
      }
    })
  })
})

