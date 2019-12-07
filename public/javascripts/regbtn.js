$(function() {
    $('.regbtn').on('click', () => {
        $.ajax({
            type: "post",
            // url: "../../routes/regq.js",
            url: "/regq",
            data: {
                username: $('.user').val(),
                password: $('.pass').val(),
                phone: $('.phone').val()
            },
            dataType: "json",
            success: function(res) {
                alert((res).msg)
                    // if (res.msg === "用户注册成功") {
                    //     location.href = 'http://localhost:3000/login'
                    // }
            }
        });
    })
})