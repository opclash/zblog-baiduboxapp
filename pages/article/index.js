// 详情页
const app = getApp();
import { getArticle } from '../../utils/request.js';
import { toDate, formatMsgTime } from '../../utils/tool.js';
Page({
    data: {
        id: '',
        // 地址
        result: {},
        // 内容
        RelatedList: [],
        // 相关
        abstract: '',
        // 摘要
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
            images: 'https://oss.opssh.cn/fonts/logo.png'
        },
        detailPath: '',
        // 底部互动 bar 的配置
        toolbarConfig: {
            moduleList: ['comment', 'like', 'favor', 'share']
            // 若 moduleList 中配置有 share 模块，默认是有，则该属性为必填，title 必传
        }
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
            id: _then.data.id
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

            post.PostTime = formatMsgTime(Number(post.PostTime) * 1000, 1);
            post.UpdateTime = formatMsgTime(Number(post.UpdateTime) * 1000, 1);
            _then.setData({
                'commentParam.snid': _then.data.id,
                'commentParam.path': '/pages/article/index?id=' + _then.data.id,
                'commentParam.title': post.Title,
                'commentParam.content': post.Intro.replace(/<[^>]+>/g, ""),
                'commentParam.images': post.Thumb,
                'toolbarConfig.placeholder': '吐槽一下',
                'toolbarConfig.share.title': post.Title,
                'toolbarConfig.share.path': '/pages/article/index?id=' + _then.data.id,
                'detailPath': '/pages/article/index?id=' + _then.data.id,

                'result': post,
                'RelatedList': post.RelatedList
            })
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _then = this;
        getArticle({
            id: _then.data.id,
        }).then(res => {
            swan.setNavigationBarTitle({
                title: "文章详情页"
            });
            var article = res.data.post;
            res.data.post.UpdateTime = toDate(Number(res.data.post.UpdateTime) * 1000, 1);
            swan.setPageInfo({
                title: article.Title,
                keywords: article.TagsName,
                description: article.Intro.replace(/<[^>]+>/g, ""),
                articleTitle: article.Title,
                releaseDate: res.data.post.UpdateTime,
                image: article.Thumb,
                visit: {
                    pv: article.ViewNums
                }
            })
        })
    },

    // 跳转内容页
    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/article/index?id=' + id
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        requireDynamicLib('myDynamicLib').listenEvent();
    },

    clickComment(e) {
        swan.showToast({
            title: this.data.post.Title
        });
    },
    // bindfavorstatuschange 事件可能的应用场景：用户点击关注后，设置隐藏按钮
    favorstatuschange(e) {
        if (e.detail && e.detail.isFavor === true) {
            this.setData({
                'disabled': false
            });
        }
    },
    score: function (e) {
        this.setData({
            sty: 1
        });
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

    },

    playTTS() {
        // 低版本开发者工具环境下，可能不支持 TTS 语音播报模拟，请使用百度 APP 打开小程序体验
        swan.canIUse('playSystemTTS')
            && swan.playSystemTTS({
                success() {
                },
                fail(reason) {
                    // 并非所有的错误回调都提供了返回参数
                    reason && console.log(reason);
                },
                complete() {
                }
            });
    }
});