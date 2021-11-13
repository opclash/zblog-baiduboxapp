// 引入接口
import urls from './http';

var token = '';

try {
    token = swan.getStorageSync('token')
} catch (e) {
    // Do something when catch error
}
// 默認请求头（可自行添加token等）

var header = {
    'content-type': 'application/x-www-form-urlencoded',
    // 'Cache-Control': 'max-age=21600',
    'Authorization': 'Bearer ' + token,
    'access-control-allow-origin': '*'
};
/**
 * function: 封装网络请求
 * @url     URL地址
 * @params  请求参数
 * @method  GET/POST（请求方式）
 * @resolve 成功回调
 * @reject  失败回调
 */

function request(url, params, method, resolve, reject) {
    swan.showLoading({
        title: "内容加载中...",
        mask: true
    });
    swan.request({
        url: url,
        // 接口地址
        data: dealParams(params),
        // 請求參數
        method: method,
        // 請求方式
        header: header,
        // 請求頭
        // 开启云加速服务(方式一)
        // 关闭：false，开启：true
        cloudCache: false,
        // 开启云加速服务，并且不以 timestamp 字段作为缓存依据（方式二）
        // cloudCache: {
        //     excludeURLQueries: ['timestamp']
        // },
        defer: false,
        // true 即表示这是一个低优先级请求，可以接受延时执行; false 或不携带此参数，均为正常优先级，即时发送。
        success: res => {
            swan.hideLoading(); // 關閉加載提示
            var data = res.data
            if (res.data) {
                // 判斷請求成功的狀態碼
                if (res.data.code == 100000) {
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            }
        },
        fail: function (error) {
            reject("");
        }
    });
}

/**
 * function: 請求時添加必帶的固定參數，沒有需求無需添加
 * @params   请求参数
*/

function dealParams(params) {
    return params = Object.assign({}, params, {// id: '666',
    });
}

const apiService = {
    // POST請求
    REQUESTPOST(url, params) {
        return new Promise((resolve, reject) => {
            request(url, params, "POST", resolve, reject);
        });
    },

    // GET請求
    REQUESTGET(url, params) {
        return new Promise((resolve, reject) => {
            request(url, params, "GET", resolve, reject);
        });
    }

}; // 外部調用接口

module.exports = {
    getHome: params => {
        // 获取首頁接口
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTGET(urls.home, params));
        });
    },
    getArticle: params => {
        // 获取文章详情接口
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTGET(urls.article, params));
        });
    },
    getSearch: params => {
        // 获取文章详情接口
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTGET(urls.search, params));
        });
    },
    getNavList: params => {
        // 查询分类的文章
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTGET(urls.navList, params));
        });
    },
    getNavPage: params => {
        // 查询分类的文章
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTGET(urls.navPage, params));
        });
    },
};