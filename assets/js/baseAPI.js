$(function () {
    $.ajaxPrefilter(function (options) {
        if (options.url.indexOf("/my/") != -1) {
            options.headers = {
                Authorization: localStorage.getItem("token") || ''
            };
        }
        options.url = 'http://ajax.frontend.itheima.net' + options.url;
    })
})