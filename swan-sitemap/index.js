
import utils from '../utils/request.js';

Page({
    data: {
        listData: [],
        totalPage: 1,
        currentPage: 1,
        path: 'swan-sitemap/index'
    },

    onLoad(e) {
        let { currentPage } = e;
        currentPage = +currentPage || 1;
        this.requestData(currentPage);
    },
    requestData(currentPage) {
        swan.request({
            url: utils.sitemap,

            header: {
                'content-type': 'application/json'
            },
            data: {
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
