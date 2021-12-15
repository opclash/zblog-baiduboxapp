// 列表
import utils from '../../utils/request.js';
import { toDate, formatMsgTime } from '../../utils/tool.js';

const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        state: false,
        // 无限加载没数据状态
        id: '',
        title: '',
        intro: '',
        page: 1,
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
        utils.getNavList({
            'cate_id': this.data.id,
            'page': _then.data.page
        }).then(res => {
            var datas = res.data.list;

            const datacc = datas.map(item => {
                item.PostTime = formatMsgTime(Number(item.PostTime) * 1000, 1);
                return item;
            });

            _then.setData({
                navList: _then.data.navList.concat(datas)
            });

            if (res.data.pagebar.PageAll <= _then.data.page) {
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
        utils.getcategory({
            'id': this.data.id,
        }).then(res => {
            swan.setNavigationBarTitle({ title: res.data.category.Name });
            swan.setPageInfo({
                title: res.data.category.Name,
                keywords: res.data.category.Name,
                description: res.data.category.Intro,
                articleTitle: res.data.category.Name,
                releaseDate: null,
                image: null
            });
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