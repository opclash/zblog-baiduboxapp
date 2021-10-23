// 详情页
const app = getApp();
import { getArticle } from '../../utils/request.js';
import { toDate } from '../../utils/tool.js';

Page({
    data: {
        id: '62',
        // 地址
        result: {},
        // 内容
        followData: [{ type: 'primary' }],
        // 关注
        disabled: true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // swan.login();
        this.data.id = options.id; // 接收id
        this.getArticle();
    },
    /**
     * 文章数据获取--数据调用加载
     */
    getArticle() {
        var _then = this;
        // 获取文章详情
        getArticle({
            id: 62
        }).then(res => {
            var article = res.result.Content;
            let result = res.result.Content
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&quot;/g, '"')
                .replace(/<section/g, '<div')
                .replace(/\/section>/g, '\div>')
                .replace(/pre class="prism-highlight/g, 'pre style="overflow: auto; padding-top: 22px; padding-bottom: 22px; color: #690; font-size: 14px; background-color: #f2f4fc; padding: 1em; margin: .5em 0;" class="prism-highlight" selectable="true" space="ensp"')
                .replace(/<img/gi, '<img class="rich-img" style="max-width:100%!important;" ')

            res.result.PostTime = toDate(Number(res.result.PostTime) * 1000, 1);

            _then.setData({
                result: res.result,
                content: result
            });
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _then = this;
        getArticle({
            id: 62,
        }).then(res => {
            swan.setNavigationBarTitle({ title: res.result.Title });
            res.result.PostTime = toDate(Number(res.result.PostTime) * 1000, 1);
            swan.setPageInfo({
                title: '大同网站建设、小程序开发、网络推广 - 彧繎博客',
                keywords: '网站建设，小程序开发，网站设计，推广外包',
                description: '本站从事网站建设、小程序开发，制作企业网站与小程序应用系统开发，提供个人、企业网站建设的外包托管，全球购海外推广等业务！',
                articleTitle:'大同网站建设、小程序开发、网络推广',
                releaseDate: res.result.PostTime
            })
        })
    }
});