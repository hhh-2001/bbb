layui.form.verify({
    pwd: [/^\S{6,12}$/, '密码长度必须在6到12位,且不能有空格'],
    repwd: function (value) {
        var pwd = $("[name=newPwd]").val();
        if (pwd != value) {
            return '密码不一致'
        }
    }


})
//密码重置
$("#myform").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
        method: 'post',
        url: '/my/updatepwd',
        data: $('#myform').serialize(),
        success: function (res) {
            console.log(res);

            layui.layer.msg('修改密码成功')
            localStorage.removeItem("token");
            // 注意这里跳转链接是在iframe跳转要找他父级
            window.parent.location.href = '/login.html';
        }
    })
})