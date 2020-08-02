$(function () {
    getCateList();
    var { layer } = layui;

    var indexAdd = null;
    var indexEdit = null;
    $("body").on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('添加失败');
                }
                layer.msg('添加内容成功');
                getCateList();//添加成功之后,当前页面显示的分类就变旧了,我们重新获取一次数据
                layer.close(indexAdd);
            }
        })
    })

    //添加分类功能
    $("#btnAdd").on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#addTpl").html()
        })
    })

    // 编辑功能
    $("body").on('click', '.edit', function () {

        var id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('获取失败')
                }
                layui.form.val("editform", res.data);
            }
        })
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: $("#editTpl").html()
        })

    })

    //为编辑表单添加提交事件
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("修改失败");
                }
                layer.msg ('修改成功') ;
                getCateList();
                layer.close(indexEdit);
            }
        })
    })

    // 点击删除按钮显示弹出层
    $('body').on('click', '.remove', function () {
        var id = $(this).attr("data-id");
        // alert(id);
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status != 0) {
                        return layer.msg('删除失败');
                    }
                    getCateList();  //删除成功之后诗句变旧了,重新发送一次ajax
                    layer.msg('删除成功')
                }
            })
            layer.close(index);
        });
    })
})
//获取文章列表数据
function getCateList() {
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status != 0) {
                layer.msg("获取文章列表失败");
            }
            console.log(res);
            var str = template('tpl', res)
            $("tbody").html(str);
        }
    })
}




