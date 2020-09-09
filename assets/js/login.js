$(function () {
  $('#login').on('click',function(){
    $('.login-box').show()
    $('.reg-box').hide()
  })
  $('#reg').on('click',function(){
    $('.reg-box').show()
    $('.login-box').hide()

  })
})