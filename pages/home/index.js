// 首页
const app = getApp();

import { getHome } from '../../utils/request.js';

import { toDate, formatMsgTime } from '../../utils/tool.js';

Page({
    data: {
        swiper: [],
        // 轮播图
        conList: [],
        // 文章列表
        hostList: [],
        // 熱門文章列表
        page: 1,
        // 頁數
        state: false,
        // 无限加载没数据状态
        swiperCurrent: "",
        //轮播图圆点
        swiperH: ""
        //这是swiper框要动态设置的高度属性
    },

    swiperChange: function (e) {
        this.setData({
            swiperCurrent: e.detail.current
            //获取当前轮播图片的下标
        })
    },

    imgHeight: function (e) {
        var winWid = swan.getSystemInfoSync().screenWidth;
        var imgh = e.detail.height;//图片高度
        var imgw = e.detail.width;//图片宽度
        var swiperH = winWid * imgh / imgw + "px";
        //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
        this.setData({
            swiperH: swiperH//设置高度
        });
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
        getHome({
            page: _then.data.page
        }).then(res => {
            let swiperList = [];
            var datas = res.result.list;
            for (var i = 0; i < datas.length; i++) {
                //用for循环把所有的时间戳都转换程时间格式
                datas[i]["PostTime"] = formatMsgTime(Number(datas[i]["PostTime"]) * 1000, 1);
            }

            for (let i = 0; i < res.result.swiper; i++) {
                if (res.result.swiper[i].Type == 'article') {
                    swiperList.push(res.result.swiper[i]);
                }
            }

            _then.setData({
                swiper: res.result.swiper,
                hostList: res.result.medias,
                conList: _then.data.conList.concat(datas)
            });

            if (res.result.pages <= _then.data.page) {
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
        var _then = this;
        getHome({
            page: _then.data.page
        }).then(res => {
            swan.setNavigationBarTitle({ title: res.result.Name });
            swan.setPageInfo({
                title: res.result.Name + ' - ' + res.result.Title,
                keywords: res.result.Keywords,
                description: res.result.Description,
                articleTitle: res.result.Title,
                releaseDate: res.result.Time,
                image: res.result.Logo
            });
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