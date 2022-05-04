// 详情页
const app = getApp();
import utils from '../../utils/request.js';
Page({
    // 使用一个标记位，确保只请求一次主数据
	hasRequest: false,
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
            title: '网站名',
            content: '网站描述',
            images: '网站图片'
        },
        detailPath: '',
        // 底部互动 bar 的配置
        toolbarConfig: {
            moduleList: ['comment', 'like', 'favor'],
            // 若 moduleList 中配置有 share 模块，默认是有，则该属性为必填，title 必传
            share: {
                title: '网站名',
                content: '网站描述',
                path: '/pages/home/index'
            }
        }
    },
	onInit: function (options) {
		if (!this.hasRequest) {
            this.hasRequest = true;
            this.data.id = options.id;
            this.getArticle();
		}
    },

    // 文章数据获取--数据调用加载
    getArticle() {
        utils.getArticle({
            id: this.data.id
        }).then(res => {
            const post = res.data.post;
            post.Content=utils.htmlspecialchars(post.Content);
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
            })
        });
    },

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

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
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

    score: function (e) {
        //点击按钮，样式改变
        this.setData({
          sty: 1
        });
    },

    // 取消事件后提示信息
    statuschange(e) {
        if (e.detail && e.detail.isFavor === false) {
            setTimeout(() => {
                swan.showToast({
                    title: '我他妈还以为是爱情',
                    icon: 'none'
                });
            });
        }
    }

});