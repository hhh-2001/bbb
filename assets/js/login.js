$(function () {
    //登录点击事件
    $("#link_login,#link_reg").on("click", function () {
        $(this).parents("form").hide().siblings("form").show();
    })

    //表单校验
    layui.form.verify({
        pwd: [/^\S{6,12}$/, '密码不能有空格,且是6到12位'],
        //校验注册时两个立马框是否一致
        repwd: function (value) {
            var val = $("#reg_form [name=password]").val();
            if (value != val) {
                return '两次输入密码不一致'
            }
        }
    })
    var { layer } = layui;
    //注册时发起ajax请求
    $("#reg_form").on("submit", function (e) {
        e.preventDefault();
        var data = {
            username: $("#reg_form [name=username]").val(),
            password: $("#reg_form [name=password]").val()
        };

        $.post("/api/reguser", data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            //注册成功时跳转登录
            $("#link_reg").click();
        })
    })

    //登录时发起ajax请求
    $("#login_form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                //登录陈宫时将token保存到本地数据
                localStorage.setItem('token', res.token);
                //跳转链接
                location.href = '/index.html';
            }
        })
    })

})