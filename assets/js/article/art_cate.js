$(function () {
    getCateList();
})
var { layer } = layui;
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