// 详情页
const app = getApp();
import { getarticleinfo } from '../../utils/request.js';
import { toDate, formatMsgTime } from '../../utils/tool.js';
Page({
    data: {
        id: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // swan.login();
        this.data.id = options.id; // 接收id
        this.getarticleinfo();
    },
    /**
     * 文章数据获取--数据调用加载
     */
    getarticleinfo() {
        var _then = this;
        // 获取文章详情
        getarticleinfo({
            id: 3, // 手动更换ID
        }).then(res => {
            const post = res.data.post;
            post.Content = post.Content
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/<section/g, '<div')
            .replace(/\/section>/g, '\div>')
            .replace(/&nbsp;/g, ' ')
            .replace(/pre class="prism-highlight/g, 'pre style="white-space: pre-wrap!important;background-color: #eee;padding: 5px 10px;margin: 1em 0;" class="prism-highlight')
            .replace(/<img/gi, '<img class="rich-img" style="max-width:100%!important;display:block" ')
            _then.setData({
                data: post
            });
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        swan.setNavigationBarTitle({ title: "关于我们" });
    }
});