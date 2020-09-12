$(function () {
  var form = layui.form
  // form.varify({
  //   required:
  // })
  initUserInfo()
  function initUserInfo () {
    $.ajax({
      url:'/my/userinfo',
      method: 'get',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        console.log(res.data);
        form.val('formUserInfo',res.data)
      }
    })
  }

  $('#changeUserInfo').on('click',function(e){
    e.preventDefault()

    $.ajax({
      url:'/my/userinfo',
      method: 'post',
      data:$(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 使用iframe标签后,iframe显示的页面可以理解为子页面
        // 使用iframe标签后,如果想调用父页面的方法
        // 可以用window.parent调用
        window.parent.getUserInfo()
        console.log(window.parent);
      }
    })
  })

})