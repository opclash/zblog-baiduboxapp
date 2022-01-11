import urls from './http';

//zbp原生
function requestapi(url, params, method, resolve, reject,args = { token: false}) {
    swan.showLoading({
        title: "内容加载中...",
        mask: true
    });

    if (args.token) {
        var token = '';
        try {
            token = swan.getStorageSync('token')
        } catch (e) {
        }
        var headers={
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
        };
        var cloudCache = false;
    }else{
        var headers={
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'nax-age=43200',
        };
        var cloudCache = urls.cloudCache;
    }

    swan.request({
        url: url,
        data: dealParams(params),
        method: method,
        header: headers,
        cloudCache: cloudCache,
        defer: false,
        success: res => {
            swan.hideLoading();
            var data = res.data
            if (res.data) {
                if (res.data.code == 200) {
                    resolve(res.data);
                } else if (data.code === 419) {
                    swan.navigateTo({
                        url: '/pages/login/index'
                    });
                } else if (data.code === 201) {
                    swan.setStorageSync('login', 1);
                    swan.setStorageSync('token', data.data.token);
                    swan.setStorageSync('user', data.data.user);
                    swan.switchTab({
                        url: '/pages/home/index',
                        success: res => {}
                    });
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
    return params = Object.assign({}, params, {
    });
}

const apiService = {
    REQUESTZBPGET(url, params) {
        var args = { token: false }
        return new Promise((resolve, reject) => {
            requestapi(url, params, "GET", resolve, reject,args);
        });
    },

    REQUESTZBPPOST(url, params) {
        var args = { token: true }
        return new Promise((resolve, reject) => {
            requestapi(url, params, "POST", resolve, reject,args);
        });
    }
};


function formatMsgTime(number) {
    var dateTime = new Date(number);
    var Y = dateTime.getFullYear();
    var M = dateTime.getMonth() + 1;
    var D = dateTime.getDate();
    var h = dateTime.getHours();
    var m = dateTime.getMinutes();
    var millisecond = dateTime.getTime();
    var now = new Date();
    var nowNew = now.getTime();
    var milliseconds = 0;
    var numberStr;
    milliseconds = nowNew - millisecond;
    if (milliseconds <= 1000 * 60 * 1) {
      numberStr = '刚刚';
    } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
      numberStr = Math.round(milliseconds / (1000 * 60)) + '分钟前';
    } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
      numberStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
      numberStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
    } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && Y === now.getFullYear()) {
      numberStr = M + '/' + D;
    } else {
      numberStr = Y + '/' + M + '/' + D;
    }
    return numberStr;
  }

function toDate(number, type) {
    var date = new Date(number);
    var Y = date.getFullYear();
    var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    if (type == '1') {
      return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
    } else if (type == '2') {
      return Y + '-' + M + '-' + D;
    }
}


module.exports = {
    getSettings: params => {
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTZBPGET(urls.settings));
        });
    },
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
    getSortsList: params => {
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTZBPGET(urls.sortslist, params));
        });
    },
    getArticleInfo: params => {
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTZBPGET(urls.articleinfo, params));
        });
    },
    getCategory: params => {
        return new Promise((resolve, reject) => {
            resolve(apiService.REQUESTZBPGET(urls.category, params));
        });
    },
    sitemap: urls.home,
    toDate: toDate,
    formatMsgTime: formatMsgTime
};