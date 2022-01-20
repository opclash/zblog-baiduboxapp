// 首页
const app = getApp();
import utils from '../../utils/request.js';
Page({
    data: {
        swiper: [],
        conList: [],
        hostList: [],
        page: 1,
        state: false,
        navShow: false,
        swiperCurrent: "",
        swiperH: "265",
    },
    swiperChange: function (e) {
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    imgHeight: function (e) {
        var winWid = swan.getSystemInfoSync().screenWidth;
        var imgh = e.detail.height; //图片高度
        var imgw = e.detail.width; //图片宽度
        var swiperH = winWid * imgh / imgw + "px";
        //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
        this.setData({
            swiperH: swiperH //设置高度
        });
    },
    onLoad: function (options) {
        this.getHome();
    },
    getHome() {

        utils.getHome({
            page: this.data.page
        }).then(res => {
            var datas = res.data.list;
            const datacc = datas.map(item => {
                item.PostTime = utils.formatMsgTime(Number(item.PostTime) * 1000, 1);
                return item;
            });
            this.setData({
                conList: this.data.conList.concat(datas)
            });
            var info = {
                conList: this.data.conList.concat(datas)
            }
            swan.setStorage({
                key: "zblog-cache",
                data: info
            });
            if (res.data.pagebar.PageAll <= this.data.page) {
                this.setData({
                    state: true
                });
            }
        });
    },
    refresh() {
        this.setData({
            state: false,
            conList: [],
            page: '1'
        });
        this.getHome();
        swan.hideNavigationBarLoading();
        swan.stopPullDownRefresh();
    },
    turnPage() {
        this.data.page = Number(this.data.page) + 1;
        this.getHome();
    },
    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/article/index?id=' + id
        });
    },
    onShow: function () {
        utils.getSettings({
        }).then(res => {
            this.setData({
                swiper: res.data.swiper,
                toolnav: res.data.toolnav,
                navimg: res.data.info.navimg,
                contacton: res.data.info.contacton,
                appbanner: res.data.info.appbanner,
                moduleId: res.data.info.moduleId,
                onask: res.data.info.onask
            });
            swan.setNavigationBarTitle({
                title: res.data.info.name
            });
            swan.setPageInfo({
                title: res.data.info.title,
                keywords: res.data.info.keywords,
                description: res.data.info.description,
                articleTitle: res.data.info.title
            });
        })
    },

    onPullDownRefresh: function () {
        this.refresh(1);
    },
    onReachBottom: function () {
        this.turnPage();
    }
});