// 列表
import { getSortsList } from '../../utils/request.js';

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

    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {
        swan.setNavigationBarTitle({ title: "分类中心" });
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