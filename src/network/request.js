import axios from 'axios'

// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });

// axios.interceptors.response.use(response => {
//     return response;
// }, err => {
//     return Promise.reject(err)
// })

export async function getMovies() {
    var d;
    await axios.get('http://localhost:8888/getMovies')
        .then(res => {
            d = res.data;
            // console.log('请求完成',d instanceof Promise);
        })
        .catch(err => {
            console.log(err);
        })
    return d;
}

export async function getTest(tag) {
    var d;
    await axios.get('http://localhost:8888/getTest', {
        params: {
            tag: tag
        }
    })
        .then((res) => {
            d = res.data;
            // console.log("axios结果", res);
        })
        .catch(err => {
            console.log(err);
        })
    return d;
}

export async function updateCollect(tag, collect, movie_id) {
    await axios.get('http://localhost:8888/updateCollect', {
        params: {
            tag: tag,
            collect: collect,
            movie_id: movie_id
        }
    })
        .then((res) => {
            // console.log("状态已更新");
        })
        .catch(err => {
            console.log(err);
        })
}

export async function updateHeatmapData(movie_id, movie_title, collect_date) {
    await axios.get("http://localhost:8888/updateHeatmapData", {
        params: {
            movie_id: movie_id,
            movie_title: movie_title,
            collect_date: collect_date
        }
    }).then((res) => {
        // console.log('updateHeatmap');
    }).catch((err) => {
        console.log(err);
    })
}

export async function deleteHeatmapData(movie_id) {
    await axios.get("http://localhost:8888/deleteHeatmapData", {
        params: {
            movie_id: movie_id,
        }
    }).then((res) => {
        // console.log('标记shanchu请求成功');
    }).catch((err) => {
        console.log(err);
    })
}

export async function getHeatmapData() {
    var d;
    await axios.get("http://localhost:8888/getHeatmapData", {

    }).then((res) => {
        d = res;
        // console.log('数据请求成功---');
    }).catch((err) => {
        console.log(err);
    })
    return d;
}