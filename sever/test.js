//测试node连接mysql数据库
const mysql = require('mysql')
const fs = require('fs');

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin',
//     port: '3306',
//     database: 'douban_movies'
// });

//创建分类电影表
function createTable(tableName) {
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        port: '3306',
        database: 'douban_movies'
    });
    let sql = `CREATE TABLE IF NOT EXISTS ` + tableName + `(
        movie_id VARCHAR(20) NOT NULL,
        movie_title VARCHAR(128) NOT NULL,
        movie_rate FLOAT(3) NOT NULL,
        movie_cover VARCHAR(200) NOT NULL,
        PRIMARY KEY (movie_id)
      ) ENGINE=INNODB CHARSET=UTF8;`
    connection.connect();
    connection.query(sql, (err, res) => {
        if (err)
            console.log(err);
        console.log(res);
    })
    connection.end();
}


// 读取json文件写入数据库
function addJson(fileName, dataName) {

    //读入文件
    fs.readFile(fileName, (err, data) => {
        if (err)
            console.log(err);
        //将json文件内容转换为对象
        data = JSON.parse(data)

        //连接数据库并写入 
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'admin',
            port: '3306',
            database: 'douban_movies'
        });
        connection.connect();
        for (var m of data.subjects) {
            id = '"' + m.id + '"';
            title = '"' + m.title + '"';
            rate = m.rate;
            cover = '"' + m.cover + '"';
            var sql = 'insert into ' + dataName + ' values(' + id + ',' + title + ',' + rate + ',' + cover + ')'
            connection.query(sql, (err, res) => {
                if (err)
                    console.log(err);
                console.log("写入成功");
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

var tag = ["爱情", "剧情", "动画", "动作", "经典", "科幻", "恐怖", "冷门佳片", "喜剧", "悬疑", "华语", "韩国", "欧美", "日本"];

// 创建表
for (var i of tag) {
    createTable(i);
    let fileName = "./data/" + i + ".json";
    addJson(fileName, i);
}
