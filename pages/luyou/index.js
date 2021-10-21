// 列表
import { getNavList } from '../../utils/request.js';
import { toDate, formatMsgTime } from '../../utils/tool.js';

const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        state: true,
        id: '',
        title: '',
        intro: '',
        page: '1',
        navList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.id = options.id; // 接收id
        this.getNavList();
    },

    getNavList() {
        var _then = this;

        getNavList({
            'cateid': 1,
            'page': _then.data.page
        }).then(res => {
            var datas = res.result.list;

            for (var i = 0; i < datas.length; i++) {
                datas[i]["PostTime"] = formatMsgTime(Number(datas[i]["PostTime"]) * 1000, 1);
            }

            _then.setData({
                title: res.result.cate.Name,
                intro: res.result.cate.Intro,
                navList: _then.data.navList.concat(datas)
            });

            if (res.result.pages <= _then.data.page) {
                _then.setData({
                    state: true
                });
            }
        });

    },

    // 查看详情
    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/article/index?id=' + id
        });
    },

    // 刷新
    refresh() {
        let _then = this;

        _then.setData({
            state: true,
            id: '',
            title: '',
            intro: '',
            page: '1',
            navList: []
        });

        _then.getNavList();
        //隐藏导航条加载动画
        swan.hideNavigationBarLoading();
        //停止下拉刷新
        swan.stopPullDownRefresh();
    },

    // 无限滚动翻页
    turnPage() {
        let _then = this;
        _then.data.page = Number(_then.data.page) + 1;
        _then.getNavList();
    },

    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {
        var _then = this;
        getNavList({
            'cateid': 1
        }).then(res => {
            swan.setNavigationBarTitle({ title: res.result.cate.Name });
            swan.setPageInfo({
                title: res.result.cate.Name + ' - ' + res.result.Name,
                keywords: res.result.cate.flgjc,
                description: res.result.cate.Intro,
                articleTitle: res.result.cate.Name,
                releaseDate: res.result.cate.Time,
                image: res.result.Logo
            })
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.refresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.turnPage();
    }
});