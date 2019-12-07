var express = require('express');
var router = express.Router();
var mysql = require('../mysql/mysqlServer')

//登录页面为get请求，用于渲染页面
router.get('/', function(req, res, next) {
    res.render('login')
})

//前端通过ajax发送post请求，将数据传输到后端，后端接收post请求，处理数据
router.post('/', function(req, res, next) {
    //获取前端发送的用户名和密码
    let username = req.body.username,
        password = req.body.password;
    // console.log(username, password);
    //建立数据库连接查询数据
    mysql.getConnection((err, connection) => {
        if (err) console.log(err);
        //执行SQL语句，查询数据库
        connection.query(`select * from user where u_name='${username}' AND u_pass='${password}'`, (err, result) => {
            if (err) console.log(err);
            //查询结果是一个数组，通过判断数组length属性，判断是否有查询结果，不能直接判断if(result)。因为result是个数组，即使是空数组，转布尔值也是true
            if (result.length) {
                res.send('{"msg":"用户名和密码正确，登录成功"}');
            } else {
                res.send('{"msg":"用户名与密码不匹配，请确认后重新输入"}')
            }
            connection.release(); //使用完毕后关闭数据库连接
        })
    })
})

module.exports = router;