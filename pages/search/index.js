// pages/search/search.js
import { getSearch } from '../../utils/request.js';
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

    getSearch () {
        var _then = this;
        getSearch({
            keyword: _then.data.keyword
        }).then(res => {

            var datas = res;
            console.log(res)

            let newTecherList = datas

            console.log(newTecherList)

            _then.setData({
                conList: newTecherList
            });
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _then = this;
        getSearch({
            keyword: _then.data.keyword
        }).then(res => {
            swan.setNavigationBarTitle({title: _then.data.keyword});
            swan.setPageInfo({
                title: '在线搜索 - 彧繎博客',
                keywords: '',
                description: '',
                articleTitle: '在线搜索'
            });
        })
    },

    // 查看详情
    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/article/index?id=' + id
        });
    }

});