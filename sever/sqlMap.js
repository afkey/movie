const mysql = require('mysql')
const fs = require('fs');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: '3306',
    database: 'test'
});

// 读取json文件写入数据库
function addJson(fileName) {
    //读入文件
    fs.readFile(fileName, (err, data) => {
        if (err)
            console.log(err);
        //将json文件内容转换为对象
        data = JSON.parse(data)
        //连接数据库并写入
        connection.connect();
        for (var m of data.subjects) {
            id = '"' + m.id + '"';
            title = '"' + m.title + '"';
            rate = m.rate;
            var sql = 'insert into movie values(' + id + ',' + title + ',' + rate + ')'
            connection.query(sql1, (err, res) => {
                if (err)
                    console.log(err);
                console.log(res);
            })
        }
        connection.end();
    })
}

//查询数据库
function queryMovie() {
    var sql = 'select * from movie'
    var data = null;
    connection.connect();
    connection.query(sql, (err, res) => {
        if (err)
            console.log(err);
        console.log(res);
    })
    connection.end();
    
}

