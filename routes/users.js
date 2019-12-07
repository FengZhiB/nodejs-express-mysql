var express = require('express');
var router = express.Router();
var mysql = require('../mysql/mysqlServer');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/', function(req, res, next) {
    mysql.getConnection((err, connection) => {
        if (err) console.log(err);
        connection.query('select * from meizuuser', (err, results) => {
            connection.release() //关闭数据库连接
            if (err) console.log(err);
            res.send(results)
        });
    });
});

module.exports = router;