$(function () {
    initCate()
    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    // 4. 点击文件上传
    $("#btnFile").on("click", function () {
        $("#coverFile").click();
    })

    //5. 监听coverFile的change事件 ,获取用户选择的文件列表,替换裁剪图片
    $("#coverFile").on('change', function () {
        if (this.files.length == 0) {
            return layer.msg("请选择图片");
        }
        // 如果选择了图片 选中的图片就会到内存中, 我们可以想办法获取内存当中地址
        var imageURL = URL.createObjectURL(this.files[0]);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imageURL)   // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    //6. 默认状态  已发布,当点击存为草稿是,默认状态改变
    var state = '已发布';
    $("#btn2").on("click", function () {
        state = '草稿';
    })
    //6.1 为表单添加 submit提交事件
    $("#form-pub").submit(function (e) {
        e.preventDefault();
        var fd = new FormData(this);
        fd.append("state", state);



        $image
            .cropper('getCroppedCanvas', {//创建一个Canvas 画布 画画 操作图片 类似ps的效果
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {//将Canvas 画布上的内容,转化为文件对象,文件是二进制 blob类型
                //得到文件对象后进行后续操作
                fd.append("cover_img", blob);//封面
                $.ajax({
                    type: 'post',
                    url: '/my/article/add',
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        if (res.status != 0) {
                            return layer.msg('发布失败');
                            location.href = '/article/art_list.html'//跳转到文章列表页
                        }
                    }
                })
            })

    })

})
/* 
data选项既可以包含一个查询字符串，比如 key1=value1&amp;key2=value2 ，也可以是一个映射，比如 {key1: 'value1', key2:'value2'} 。如果使用了后者的形式，则数据再发送器会被转换成查询字符串。这个处理过程也可以通过设置    processData  选项为false来回避。如果我们希望发送一个XML对象给服务器时，这种处理可能并不合适。并且在这种情况下，我们也应当改变    contentType    选项的值，用其他合适的MIME类型来取代默认的 application/x-www-form-urlencoded 
*/

var { layer } = layui;
//定义文章加载的分类方法
function initCate() {
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            console.log(res);
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