// 首页
const app = getApp();
import utils from '../../utils/request.js';
import { toDate, formatMsgTime } from '../../utils/tool.js';
Page({
    data: {
        conList: [],
        page: 1,
        state: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getHome();
    },

    getHome() {
        var _then = this;
        // 获取首頁接口
        utils.getHome({
            page: _then.data.page
        }).then(res => {
            var datas = res.data.list;
            const datacc = datas.map(item => {
                item.PostTime = formatMsgTime(Number(item.PostTime) * 1000, 1);
                return item;
            });

            _then.setData({
                hostList: null,
                conList: _then.data.conList.concat(datas)
            });

            if (res.data.pagebar.PageAll <= _then.data.page) {
                _then.setData({
                    state: true
                });
            }
        });
    },
    // 刷新
    refresh() {
        let _then = this;
        _then.setData({
            state: false,
            conList: [],
            // 文章列表
            page: '1' // 頁數
        });
        _then.getHome();
        //隐藏导航条加载动画
        swan.hideNavigationBarLoading();
        //停止下拉刷新
        swan.stopPullDownRefresh();
    },

    // 无限滚动翻页
    turnPage() {
        let _then = this;
        _then.data.page = Number(_then.data.page) + 1;
        _then.getHome();
    },

    // 跳转内容页
    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/article/index?id=' + id
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        swan.setNavigationBarTitle({
            title: "彧繎博客"
        });
        swan.setPageInfo({
            title: "彧繎博客 - 路由器刷机与网络资源分享",
            keywords: "路由器刷机,路由器固件,软路由刷机,软路由固件,路由固件刷写,开源代码分享",
            description: "路由网致力于路由器刷机，软路由固件刷写，OpenWrt插件安装，以及OpenWrt固件编译和开源代码分享，通过分享互联网知识让更多数码爱好者从中受益，与数码爱好者用代码改变未来!",
            articleTitle: "彧繎博客 - 路由器刷机与网络资源分享"
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.refresh(1);
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.turnPage();
    }
});