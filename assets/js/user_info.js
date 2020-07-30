$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称不能大于6位数'
            }
        }
    })
    var { layer } = layui;
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }
    //另一种写法:
    // nickname: [/^\S{1,6}$/, '昵称不能大于6位数']

    // 重置按钮
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        initUserInfo();
    })


    //修改用户信息
    $("#myform").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $("#myform").serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('修改用户信息失败');
                }
                layer.msg('修改用户信息成功');
                initUserInfo();
            }
        })
    })

})