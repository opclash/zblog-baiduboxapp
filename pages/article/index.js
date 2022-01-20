// 详情页
const app = getApp();
import utils from '../../utils/request.js';

Page({
    data: {
        id: '',
        result: {},
        followData: [{
            type: 'primary'
        }],
        sty: 0,
        disabled: true,
        // 关注
        commentParam: {
            snid: '0',
            path: 'pages/home/index&_swebfr=0',
            title: '彧繎博客',
            content: '关注互联网服务,分享极客精神!',
            images: 'https://oss.opssh.cn/zb_users/upload/2021/12/202112257114_180.png'
        },
        detailPath: '',
        // 底部互动 bar 的配置
        toolbarConfig: {
            moduleList: ['comment', 'like', 'favor', 'share'],
            // 若 moduleList 中配置有 share 模块，默认是有，则该属性为必填，title 必传
            share: {
                title: '彧繎博客',
                content: '关注互联网服务,分享极客精神!',
                path: '/pages/home/index'
            }
        }
    },

    onLoad: function (options) {
        this.data.id = options.id; // 接收id
        this.getArticle();
    },

    getArticle() {
        utils.getArticle({
            id: this.data.id
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
            .replace(/pre class="prism-highlight/g, 'pre style="overflow: auto; padding-top: 22px; padding-bottom: 22px; color: #690; font-size: 14px; background-color: #f2f4fc; padding: 1em; margin: .5em 0;" class="prism-highlight language-php" selectable="true" space="ensp"')
            .replace(/<img/gi, '<img class="rich-img" style="max-width:100%!important;" ')
            .replace(/<td([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<td')
            .replace(/<td([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<td')
            .replace(/<td>/ig, '<td style="border: 1px solid #f2f2f5;">')
            .replace(/<h2([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<h2')
            .replace(/<h2([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<h2')
            .replace(/<h2>/ig, '<h2 style="border-bottom: 1px solid #dfe2ef;padding: 0 0 1rem;font-size: 20px;">');

            post.PostTime = utils.formatMsgTime(Number(post.PostTime) * 1000, 1);
            post.UpdateTime = utils.formatMsgTime(Number(post.UpdateTime) * 1000, 1);
            this.setData({
                'commentParam.snid': this.data.id,
                'commentParam.path': '/pages/article/index?id=' + this.data.id,
                'commentParam.title': post.Title,
                'commentParam.content': post.Intro.replace(/<[^>]+>/g, ""),
                'commentParam.images': post.Thumb,
                'toolbarConfig.placeholder': '吐槽一下',
                'toolbarConfig.share.title': post.Title,
                'toolbarConfig.share.content': post.Intro.replace(/<[^>]+>/g, "").substring(0, 15),
                'toolbarConfig.share.path': '/pages/article/index?id=' + this.data.id,
                'detailPath': '/pages/article/index?id=' + this.data.id,
                'result': post,
                'RelatedList': post.RelatedList
            });
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        utils.getArticle({
            id: this.data.id,
        }).then(res => {
            swan.setNavigationBarTitle({
                title: "文章详情页"
            });
            var article = res.data.post;
            res.data.post.UpdateTime = utils.toDate(Number(res.data.post.UpdateTime) * 1000, 1);
            swan.setPageInfo({
                title: article.Title,
                keywords: article.TagsName,
                description: article.Intro.replace(/<[^>]+>/g, ""),
                articleTitle: article.Title,
                releaseDate: res.data.post.UpdateTime,
                image: article.Thumb
            })
        });
        utils.getSettings({
        }).then(res => {
            this.setData({
                comlist: res.data.info.comlist,
            });
        })
    },

    // 跳转内容页
    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/article/index?id=' + id
        });
    },

    onReady: function () {
        requireDynamicLib('myDynamicLib').listenEvent();
    },

    clickComment(e) {
        swan.showToast({
            title: this.data.result.Title
        });
    },

    onShareAppMessage() {
        this.data.toolbarConfig.share.path;
        return this.data.toolbarConfig.share;
    },

    // bindfavorstatuschange 事件可能的应用场景：用户点击关注后，设置隐藏按钮
    favorstatuschange(e) {
        if (e.detail && e.detail.isFavor === true) {
            this.setData({
                'disabled': false
            });
        }
    },

    // 取消事件后提示信息
    statuschange(e) {
        if (e.detail && e.detail.isFavor === false) {
            setTimeout(() => {
                swan.showToast({
                    title: '我还他妈以为爱情来了！',
                    icon: 'none'
                });
            });
        }
    }
});