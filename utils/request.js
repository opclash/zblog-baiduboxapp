import urls from './http';

//zbp原生
function requestapi(url, params, method, resolve, reject) {
    swan.showLoading({
        title: "内容加载中...",
        mask: true
    });

    var header = {
        'content-type': 'application/x-www-form-urlencoded',
        'access-control-allow-origin': '*'
    };

    swan.request({
        url: url,
        data: dealParams(params),
        method: method,
        header: header,
        cloudCache: false,
        defer: false,
        success: res => {
            swan.hideLoading();
            var data = res.data
            if (res.data) {
                if (res.data.code == 200) {
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            }
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

function htmlspecialchars(str)
{
    str = str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/<section/g, '<div')
    .replace(/\/section>/g, '\div>')
    .replace(/&nbsp;/g, ' ')

    .replace(/pre class="prism-highlight/g, 'pre style="overflow: auto; padding-top: 22px; padding-bottom: 22px; color: #61aeee; font-size: 14px; background-color: #282c34; padding: 1em; margin: .5em 0;" class="prism-highlight language-php" selectable="true" space="ensp"')
    .replace(/<img/gi, '<img class="rich-img" style="max-width:100%!important;margin-top: 1em;margin-bottom: 1em;" ')
    .replace(/<table/gi, '<table style="border-collapse: collapse; margin: 0 0 1rem; word-break: normal; border-spacing: 0; text-align:center; width: 99.9%;" ')

    .replace(/<td([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<td')
    .replace(/<td([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<td')
    .replace(/<td>/ig, '<td style="border: 1px solid #f2f2f5;">')
    .replace(/<h2([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<h2')
    .replace(/<h2([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<h2')
    .replace(/<h2>/ig, '<h2 style="border-bottom: 1px solid #dfe2ef;padding: 0 0 1rem;font-size: 20px;">');

    return str;
}


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
      numberStr = Y + '/' + M + '/' + D;
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
    formatMsgTime: formatMsgTime,
    htmlspecialchars: htmlspecialchars
};