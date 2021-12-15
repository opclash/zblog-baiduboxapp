// pages/search/search.js
import utils from '../../utils/request.js';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        keyword: '',
        conList: [],
        newTecherList: true
        // 文章列表
    },

    // 输入框输入后回车触发
    searchSubmit(e) {
        this.setData({
            keyword: e.detail.value.trim()
        });
        this.getSearch();
    },

    getSearch() {
        var _then = this;
        utils.getSearch({
            search: _then.data.keyword
        }).then(res => {
            var datas = res;
            let newTecherList = datas
            _then.setData({
                conList: newTecherList
            });
        });
    },

    onShow: function () {
        swan.setNavigationBarTitle({ title: '在线搜索' });
    },

    // 查看详情
    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/article/index?id=' + id
        });
    }

});