// 列表
const app = getApp();
import utils from '../../utils/request.js';

Page({
    // 使用一个标记位，确保只请求一次主数据
	hasRequest: false,
    data: {
        state: false,
        id: '',
        page: '1',
        navList: [],
        listname: '文章归档',
        listdesc: '汇聚本站所有文章内容，一切只为更好！'
    },

    onInit: function (options) {
		if (!this.hasRequest) {
			this.hasRequest = true;
            this.data.id = options.id;
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

    onShow: function () {
        utils.getCategory({
            'id': this.data.id,
        }).then(res => {
            swan.setNavigationBarTitle({ title: res.data.category.Name });
            swan.setPageInfo({
                title: res.data.category.Name,
                keywords: res.data.category.Name,
                description: res.data.category.Intro,
                articleTitle: res.data.category.Name
            });
            this.setData({
                listname: res.data.category.Name,
                listdesc: res.data.category.Intro,
            });
        })
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