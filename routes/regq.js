var express = require('express');
var router = express.Router();
var mysql = require('../mysql/mysqlServer');

//登录页面为get请求
router.get('/', function(req, res, next) {
    res.render('reg')
});

//前端通过ajax发送post请求，将数据传输到后端，后端接收post请求，处理数据
router.post('/', function(req, res) {
    let username = req.body.username,
        password = req.body.password,
        phone = req.body.phone;
    mysql.getConnection((err, connection) => {
        //查询结果是一个数组，通过判断数组length属性，判断是否有查询结果，不能直接判断if(result)。因为result是个数组，即使是空数组，转布尔值也是true
        if (err) console.log(err);
        connection.query(`select * from user where u_name='${username}' `, (err, result) => {
            if (err) console.log(err);
            if (result.length) {
                res.send('{"msg":"用户已存在"}')
                console.log(result)
            } else {
                connection.query(`INSERT INTO user(u_pass, u_name, u_num) VALUES ('${password}','${username}','${phone}')`, (err, resultss) => {
                    // console.log(resultss)
                    if (err) console.log(err);
                    if (resultss.affectedRows) { //判断影响的行数
                        // console.log(resultss)
                        res.send('{"msg":"用户注册成功"}')
                    } else {
                        res.send('{"msg":"注册失败，但是可以注册"}')
                    }
                })
            }
            connection.release() //关闭数据库连接
        });
    });
})

module.exports = router;