// 列表
import utils from '../../utils/request.js';

const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        state: false,
        id: '',
        page: '1',
        navList: []
    },

    onInit: function (options) {
		if (!this.hasRequest) {
			this.hasRequest = true;
            this.data.id = options.id; // 接收id
            this.getNavList();
		}
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (!this.hasRequest) {
			this.hasRequest = true;
            this.data.id = options.id; // 接收id
            this.getNavList();
		}
    },

    getNavList() {
        utils.getNavList({
            'cate_id': this.data.id,
            'page': this.data.page
        }).then(res => {
            var datas = res.data.list;

            const datacc = datas.map(item => {
                item.PostTime = utils.formatMsgTime(Number(item.PostTime) * 1000, 1);
                return item;
            });

            this.setData({
                navList: this.data.navList.concat(datas)
            });

            if (res.data.pagebar.PageAll <= this.data.page) {
                this.setData({
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
        this.data.page = Number(this.data.page) + 1;
        this.getNavList();
    },

    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {
        utils.getCategory({
            'id': this.data.id,
        }).then(res => {
            swan.setNavigationBarTitle({ title: res.data.category.Name });
            swan.setPageInfo({
                title: res.data.category.Name + ' - 彧繎博客',
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