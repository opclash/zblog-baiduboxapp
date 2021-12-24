// 列表
import { getSortsList } from '../../utils/request.js';
const app = getApp();
Page({

    data: {
        state: true,
        id: '',
        title: '',
        intro: '',
        page: '1',
        navList: []
    },

    onLoad: function (options) {
        this.getSortsList();
    },

    getSortsList() {
        getSortsList({
            'root_id': 0
        }).then(res => {
            var datas = res.data.list;
            this.setData({
                navList: this.data.navList.concat(datas)
            });
        });
    },

    // 查看详情
    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/list/index?id=' + id
        });
    },

    // 刷新
    refresh() {
        this.setData({
            state: true,
            id: '',
            title: '',
            intro: '',
            page: '1',
            navList: []
        });

        this.getSortsList();
        swan.hideNavigationBarLoading();
        swan.stopPullDownRefresh();
    },

    onShow: function () {
        swan.setNavigationBarTitle({ title: "分类中心" });
    },

    onPullDownRefresh: function () {
        this.refresh(1);
    },
    onReachBottom: function () {
        this.turnPage();
    }
});