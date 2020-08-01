$(function () {
    initCate()

})
var { layer } = layui;
//定义文章加载的分类方法
function initCate() {
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status != 0) {
                layer.msg('获取数据失败!');
            }
            //调用模板渲染分类下拉菜单
            var str = template('tpl', res);
            $("[name=cate_id]").html(str);
            layui.form.render();
        }
    })
}