//Authorization
/* $(function () {
    // 调用函数获取用户基本信息
    getuserinfo();

    var { layer } = layui;
    //点击退出功能
    $("#btnLoginout").on("click", function () {
        //提示用户是否退出
        layer.confirm('确定退出登录??', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1. 清空本地存储的token
            localStorage.removeItem('token');
            //2. 重新跳转到登录
            location.href = '/login.html';

            //关闭confirm询问框
            layer.close(index);
        });
    })
}) */


/* 
    1. 请求报文: 就是客户端和服务器说的话
    2. 请求头 额外加一个凭证
    3. 请求体 请求参数 无
*/
// 获取用户基本信息
/* function getuserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {

            //1. 
            // 如果有昵称nickname就用昵称,否则就用用户名username
            if (res.status != 0) {
                return layer.msg('获取用户信息失败');
            }

            //2. 
            if (res.data.nickname == '') {
                //用户名
                $(".userinfo .welcome").html(res.data.username);
            } else {
                // 用昵称
                $(".userinfo .welcome").html(res.data.nickname);

            }
            //3. 
            if (res.data.user_pic) {
                //用头像
                $(".layui-nav-img").attr('src', res.data.user_pic).show();
            } else {
                //用文本头像
                $(".text-avatar").html(res.data.username[0].toUpperCase()).show();
            }
        },
        //4. 
        complete: function (res) {
            // console.log(11);

            //登录拦截, 如果非法进来的,直接跳转到登录页面
            if (res.responseJSON.status == 1) {
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }
    })

} */






/* // 渲染头像
function renderAvatar(user) {

    //1. 获取用户的昵称
    var name = user.nickname || user.username;

    //2. 设置欢迎文本
    $("#welcome").html("欢迎  " + name);

    //3. 按需渲染用户头像
    if (user.user_pic !== null) {
        //3.1 渲染图片头像
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        //3.2 渲染文本头像
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
} */










$(function () {
    // 调用这个函数 获取用户信息
    getUserInfo()
    // 退出功能 绑定点击事件
    $('#logout').on('click', function () {
        console.log(112);
        //eg1
        layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 销毁凭证
            localStorage.removeItem('token');
            // 跳转到登录
            location.href = '/login.html'
            layer.close(index);
        });
    })
    // 创建一个函数


})
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status != 0) {
                return layer.msg('获取用户信息失败');
            }

            // 如果有昵称就用昵称,否则用用户名
            if (res.data.nickname == '') {
                // return layui.layer.msg(res.message)
                $('.userinfo .welcome').html(res.data.username);
            } else {
                // 用昵称
                $('.userinfo .welcome').html(res.data.nickname);
            }
            if (res.data.user_pic) {
                $('.layui-nav-img').attr('src', res.data.user_pic).show();

            } else {
                $('.text-avatar').html(res.data.username[0].toUpperCase()).show();

            }

            // renderAvatar(res.data);  
        },
        complete: function (res) {
            // 登录拦截log

            if (res.responseJSON.status === 1) {
                console.log(222);
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }
    })
}
