const express = require('express');
const mysql = require('mysql');
const app = express();

//查询数据库
function queryMovie(sql, callback) {
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        port: '3306',
        database: 'douban_movies',
        dateStrings: true //解决时间格式
    });
    connection.connect();
    connection.query(sql, (err, data) => {
        callback(data)
    })
    connection.end();
}


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
app.get('/getMovies', (req, res) => {
    let sql = 'select * from movie';
    queryMovie(sql, (data) => {
        res.send(data);
    });
})


app.get('/getTest', (req, res) => {
    let tag = req.query.tag;
    // let sql = 'select * from ' + tag;
    let sql = 'SELECT * FROM ' + tag + ' ORDER BY movie_rate DESC'
    // let sql = 'SELECT * FROM ' + tag + ' GROUP BY collect,movie_id,movie_title,movie_rate ORDER BY collect DESC'
    queryMovie(sql, (data) => {
        res.send(data);
    });
})

app.get('/updateCollect', (req, res) => {
    // let tag = req.query.tag;
    let tag = ["爱情", "剧情", "动画", "动作", "经典", "科幻", "恐怖", "冷门佳片", "喜剧", "悬疑", "华语", "韩国", "欧美", "日本"];
    let collect = req.query.collect;
    let movie_id = req.query.movie_id
    for (let i of tag) {
        let updateSql = 'update ' + i + ' set collect=' + collect + ' where movie_id="' + movie_id + '"';
        queryMovie(updateSql, (data) => {
            // console.log('updating....');
        });
    };
    res.send('update success');
})

app.get('/updateHeatmapData', (req, res) => {
    let id = '"' + req.query.movie_id + '"';
    let title = '"' + req.query.movie_title + '"';
    let date = '"' + req.query.collect_date + '"';

    let sql = 'insert into movie_collect values(' + id + ',' + title + ',' + date + ')';
    queryMovie(sql, (data) => {
        // console.log('标记添加');
    })
    res.send('11')
})

app.get('/deleteHeatmapData', (req, res) => {
    let id = '"' + req.query.movie_id + '"';
    let sql = 'delete from movie_collect where movie_id=' + id
    queryMovie(sql, (data) => {
        // console.log('标记删除');
    })
    res.send(sql)
})

app.get('/getHeatmapData', (req, res) => {
    let sql = 'SELECT collect_date,COUNT(1) AS counts FROM `movie_collect` GROUP BY collect_date'
    queryMovie(sql, (data) => {
        res.send(data);
    })
})

app.listen(8888, () => {
    console.log('服务器启动');
})

