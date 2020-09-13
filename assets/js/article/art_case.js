$(function () {
  var layer = layui.layer
  var form = layui.form
  getCateList()


  // 渲染数据
  function getCateList() {
    $.ajax({
      method: 'get',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        console.log(res);
        layer.msg(res.message)

        var tableHtml = template('tpl-table', res)

        $('tbody').html(tableHtml)
      }
    })
  }


  // 点击添加完成清除弹窗
  var indexAdd = null
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#add-dialog').html()
    })
  })


  // 提交添加内容
  $('body').on('submit', '#addCaseForm', function (e) {
    e.preventDefault()

    $.ajax({
      url: '/my/article/addcates',
      method: 'post',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('添加失败')

        }
        layer.msg('添加成功')

        layer.close(indexAdd)

        getCateList()

        // console.log(res);
        // console.log($(this).serialize());
      },
    })
  })



  // 设置修改弹窗
  $('body').on('click', '.btn-edit', function () {
    editCateIndex = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#edit-dialog').html()
    })

    var cateId = $(this).attr('data-id')
    // 获取修改接口
    $.ajax({
      url: `/my/article/cates/${cateId}`,
      method: 'get',
      success: function (res) {
        console.log(res.status);
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // console.log(res);
        // console.log(res.data);
        form.val('edit-form', res.data)
      }
    })

  })

    // 编辑文章分类
    $('body').on('submit', '#editCaseForme', function (e) {
      // e.preventDefault()

      $.ajax({
        method: 'post',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg('成功')
          getCateList()
          layer.close(editCateIndex)
        }

      })
    })


    // 删除文章分类
    $("body").on('click', '.btn-del', function () {
      console.log(1);
      // 提示用户是否要删除
      var cateId = $(this).attr('data-id')
      layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
          method: 'GET',
          url: '/my/article/deletecate/' + cateId,
          success: function (res) {
            if (res.status !== 0) {
              return layer.msg('删除分类失败！')
            }
            layer.msg('删除分类成功！')
            getCateList()
            // layer.close(indexAdd)
          }
        })
      })
    })

})
