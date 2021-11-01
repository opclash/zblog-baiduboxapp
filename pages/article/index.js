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
        followData: { type: 'primary' },
        // 关注
        likeParam: {},
        // 点赞
        disabled: true,
        commentParam: {
            snid: '0',
            path: 'pages/home/index&_swebfr=0',
            title: '彧繎博客 - 关注互联网服务,分享极客精神!',
            content: '彧繎（yù rán）致力于软路由固件刷写、zblog前端开发以及服务器运维经验和日常资源分享，通过分享互联网知识给开发者，让更多开发者从中受益，与网络开发者用代码改变未来!',
            images: 'https://oss.opssh.cn/fonts/logo.png'
        },
        // 评论
        detailPath: '',
        // 路径
        likeConfig: {
            moduleList: ['like', 'favor']
            // 若 moduleList 中配置有 share 模块，默认是有，则该属性为必填，title 必传
        },
        toolbarConfig: {
            moduleList: ['comment', 'like', 'favor', 'share']
            // 若 moduleList 中配置有 share 模块，默认是有，则该属性为必填，title 必传
        }
        // 底部互动 bar 的配置
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
            var article = res.result.Content;
            let result = res.result.Content
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&quot;/g, '"')
                .replace(/<section/g, '<div')
                .replace(/\/section>/g, '\div>')
                .replace(/pre class="prism-highlight/g, 'pre style="overflow: auto; padding-top: 22px; padding-bottom: 22px; color: #690; font-size: 14px; background-color: #f2f4fc; padding: 1em; margin: .5em 0;" class="prism-highlight language-javascript" selectable="true" space="ensp"')
                .replace(/<img/gi, '<img class="rich-img" style="max-width:100%!important;" ')

            res.result.PostTime = formatMsgTime(Number(res.result.PostTime) * 1000, 1);
            res.result.UpdateTime = toDate(Number(res.result.UpdateTime) * 1000, 1);

            const pageStack = getCurrentPages();
            const currentPage = pageStack[pageStack.length - 1];
            const privateProperties = currentPage.privateProperties || {};
            const currentUri = privateProperties.accessUri || currentPage.uri;

            _then.setData({
                'commentParam.snid': _then.data.id,
                'commentParam.path': '/pages/article/index?id=' + _then.data.id,
                'commentParam.title': res.result.Title,
                'commentParam.content': res.result.Intro.replace(/<[^>]+>/g, ""),
                'commentParam.images': res.result.Thumb,

                'toolbarConfig.placeholder': '吐槽一下',
                'toolbarConfig.share.title': res.result.Title,
                'toolbarConfig.share.path': '/pages/article/index?id=' + _then.data.id,
                'detailPath':'/pages/article/index?id=' + _then.data.id,

                'likeParam.snid': _then.data.id,
                'likeParam.openid': 'mVMFstfXtsndgnRObr7BoP9hoL',
                'likeParam.title': res.result.Title,
                'likeParam.path': currentUri,

                'RelatedList': res.result.RelatedLis,
                'result': res.result,
                'content': result
            });
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
            res.result.UpdateTime = toDate(Number(res.result.UpdateTime) * 1000, 1);
            swan.setNavigationBarTitle({ title: "文章详情页" });
            swan.setPageInfo({
                title: res.result.Title + ' - 彧繎博客',
                keywords: res.result.Tags,
                description: res.result.Intro.replace(/<[^>]+>/g, ""),
                articleTitle: res.result.Title,
                releaseDate: res.result.UpdateTime,
                image: res.result.Thumb,
                visit: {
                    pv: res.result.ViewNums
                }
            })
        })
    },

    oneTap: function (event) {
        swan.showToast({
            // 提示内容
            title: "百度认证：千粉作者，科技领域爱好者",
            icon: "none",
            duration: 2000,
            mask: false,
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

    // bindfavorstatuschange 事件可能的应用场景：用户点击关注后，设置隐藏按钮
    favorstatuschange(e) {
        if (e.detail && e.detail.isFavor === true) {
            this.setData({ 'disabled': false });
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
    },
    playTTS() {
        console.log('playTTS');
        // 低版本开发者工具环境下，可能不支持 TTS 语音播报模拟，请使用百度 APP 打开小程序体验
        swan.canIUse('playSystemTTS')
            && swan.playSystemTTS({
                success() {
                    console.log('play TTS success!');
                },
                fail(reason) {
                    console.log('play TTS fail!');
                    // 并非所有的错误回调都提供了返回参数
                    reason && console.log(reason);
                },
                complete() {
                    console.log('play TTS complete!');
                }
            });
    }

});