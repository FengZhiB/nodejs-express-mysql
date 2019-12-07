$(function() {
    $('#login').on('click', () => {
        $.ajax({
            type: "post",
            url: "/login",
            data: {
                username: $('.username').val(),
                password: $('.password').val()
            },
            dataType: "json",
            success: function(res) {
                alert(res.msg)
                    // console.log(res.msg)
            }
        });
    })
})