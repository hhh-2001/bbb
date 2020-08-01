$(function () {
    //调用获取文章列表数据
    inittable();
    //调用文章分类列表
    initCate()
    // 筛选功能
    $("#filterForm").on("submit", function (e) {
        e.preventDefault();
        q.cate_id = $('[name=cate_id').val();
        q.state = $('[name=state]').val();
        inittable(); //重新获取文章列表数据
    })

    //删除功能
    $("tbody").on("click", '.remove', function () {
        layer.confirm('是否确定删除?', { icon: 3, title: '提示' }, function (index) {
            var id = $(this).attr("data-id");
            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status != 0) {
                        return layer.msg('删除失败');
                    }
                    layer.msg("删除成功");

                    if ($('.remove').length == 1) {
                        q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1;
                    }
                    inittable();//删除成功后列表数据变旧了,重新发送一次ajax请求
                }
            })
            layer.close(index);
        });
    })
})


var { layer } = layui;
// var form = layui.form;
var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
}
// Anime
//获取文章列表数据
function inittable() {
    $.ajax({
        type: 'get',
        url: '/my/article/list',
        data: q,
        success: function (res) {
            if (res.status != 0) {
                return layer.msg("获取数据失败");
            }
            console.log(res);
            var str = template('tpl', res);
            $("tbody").html(str);
            renderPage(res.total);
        }
    })
}
//模板过滤器
template.defaults.imports.dateformat = function (str) {
    var dt = new Date(str);
    var y = dt.getFullYear();   //年
    var m = (dt.getMonth() + 1).toString().padStart(2, '0');  //s月
    var d = (dt.getDate()).toString().padStart(2, '0');       //日
    var hh = (dt.getHours()).toString().padStart(2, '0');     //时
    var mm = (dt.getMinutes()).toString().padStart(2, '0');   //分
    var ss = (dt.getSeconds()).toString().padStart(2, '0');   //秒(

    var str = `${y}年${m}月${d}日 ${hh}时${mm}分${ss}秒`;
    return str;
}
// 获取文章分类列表
function initCate() {
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status != 0) {
                return layer.msg("获取数据失败")
            }
            console.log(res);
            var htmlstr = template('tpl_cate', res);
            $("[name=cate_id]").html(htmlstr);
            layui.form.render('select');
        }
    })
}

function renderPage(total) {
    //console.log(total);


    //执行一个laypage实例
    layui.laypage.render({
        elem: 'pageBox',
        count: total,
        limit: q.pagesize,
        curr: q.pagenum,
        limits: [1, 2, 3, 4, 5],
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        jump: function (obj, first) {
            console.log(obj);
            q.pagenum = obj.curr;
            q.pagesize = obj.limit;
            if (!first) {
                inittable();
            }
        }
    });
}