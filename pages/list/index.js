// 列表
import utils from '../../utils/request.js';

const app = getApp();

Page({

    data: {
        state: false,
        id: '',
        page: '1',
        navList: []
    },

    onLoad: function (options) {
        this.getNavList();
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

    onShow: function () {
        utils.getCategory({
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

    onPullDownRefresh: function () {
        this.refresh();
    },

    onReachBottom: function () {
        this.turnPage();
    }
});