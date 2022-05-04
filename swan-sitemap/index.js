
import utils from '../utils/request.js';

Page({
    data: {
        listData: [],
        totalPage: 1,
        currentPage: 1,
        path: 'swan-sitemap/index'
    },

    onLoad(e) {
        // 初始页面打开时，需要读取页面的 currentPage 参数（即翻页页码），并根据参数值请求数据
        let { currentPage } = e;
        // 起始页码为 1，如读取到的值为空，默认赋值起始页码
        currentPage = +currentPage || 1;
        // 根据当前页码获取该页数据资源
        this.requestData(currentPage);
    },
    requestData(currentPage) {
        // 发起数据资源请求。
        swan.request({
            // 数据接口，需改为开发者实际的请求接口
            url: utils.sitemap,
            header: {
                'content-type': 'application/json'
            },
            data: {
                // 参数中需携带页码参数，此为示例，可根据实际情况传入其他所需参数
                page: currentPage
            },
            success: res => {

                if (res.statusCode === 200) {
                    let resData = res.data;
                    let list = resData.data.list

                    for (var i = 0; i < resData.data.list.length; i++) {
                        resData.data.list[i]["PostTime"] = utils.toDate(Number(resData.data.list[i]["PostTime"]) * 1000, 1);
                    }

                    let newTecherList = list.map(item => ({
                        title: item.Title,
                        path: '/pages/article/index?id=' + item.ID,
                        releaseDate: item.PostTime
                    }))

                    this.setData({
                        listData: newTecherList,
                        totalPage: resData.data.pagebar.PageAll,
                        currentPage
                    });
                }
            }
        });
    }
});
