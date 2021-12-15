// 引入接口
import urls from './http'; // 默認请求头（可自行添加token等）

var header = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'nax-age=43200',
};

//zbp原生
function requestapi(url, params, method, resolve, reject) {
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
        // 开启云加速服务
        cloudCache: urls.cloudCache,
        // 請求頭
        defer: false,
        // true 即表示这是一个低优先级请求，可以接受延时执行; false 或不携带此参数，均为正常优先级，即时发送。
        success: res => {
            swan.hideLoading(); // 關閉加載提示
            var data = res.data
            if (res.data) {
                // 判斷請求成功的狀態碼
                if (res.data.code == 200) {
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
    return params = Object.assign({}, params, { // id: '666',
    });
}

const apiService = {
    REQUESTZBPGET(url, params) {
        return new Promise((resolve, reject) => {
            requestapi(url, params, "GET", resolve, reject);
        });
    },

    REQUESTZBPPOST(url, params) {
        return new Promise((resolve, reject) => {
            requestapi(url, params, "POST", resolve, reject);
        });
    }
};

module.exports = {
    getHome: params => {
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTZBPGET(urls.home, params));
        });
    },
    getArticle: params => {
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTZBPGET(urls.articleinfo, params));
        });
    },
    getSearch: params => {
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTZBPGET(urls.home, params));
        });
    },
    getNavList: params => {
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTZBPGET(urls.home, params));
        });
    },
    getsortslist: params => {
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTZBPGET(urls.sortslist, params));
        });
    },
    getarticleinfo: params => {
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTZBPGET(urls.articleinfo, params));
        });
    },
    getcategory: params => {
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTZBPGET(urls.category, params));
        });
    },
    sitemap: urls.home
};