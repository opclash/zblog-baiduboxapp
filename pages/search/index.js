// pages/search/search.js
import utils from '../../utils/request.js';
Page({
    data: {
        keyword: '',
        conList: [],
        newTecherList: true,
        pageTitle: '内容搜索',
        appkey: '你自己的appkey',
        searchBoxConf: {
            placeholder: '请填写搜索词',
            needVoice: false
        },
        searchMode: 'timely',
        searchResultConf: {
            dataType: ['2'],
            showTitle: false,
            showSpin: true
        },
        historyMode: 'home'
    },
    // 输入框输入后回车触发
    searchSubmit(e) {
        this.setData({
            keyword: e.detail.value.trim()
        });
        this.getSearch();
    },
    getSearch() {
        utils.getSearch({
            page: this.data.page,
            search: this.data.keyword
        }).then(res => {
            var datas = res;
            let newTecherList = datas;
            this.setData({
                conList: newTecherList
            });
        });
    },

    onShow: function () {
        utils.getSettings({
        }).then(res => {
            this.setData({
                searchqh: res.data.info.searchqh
            });
            swan.setNavigationBarTitle({
                title: "内容搜索"
            });
        })
    },

    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/article/index?id=' + id
        });
    }
});