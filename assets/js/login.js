$(function () {
  $('#login').on('click',function(){
    $('.login-box').show()
    $('.reg-box').hide()
  })
  $('#reg').on('click',function(){
    $('.reg-box').show()
    $('.login-box').hide()

  })


  var form = layui.form

  form.verify({
    pwd:[/^[\S]{6,12}$/,'密码必须6-12位，且不能出现空格'],

    repwd:function(value){
      var pwd = $('.reg_box[name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })
})