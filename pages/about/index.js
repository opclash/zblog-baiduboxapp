// 独立页，可以无限制复制使用，修改ID即可
const app = getApp();
import { getArticleInfo } from '../../utils/request.js';

Page({
    data: {
        id: '',
        disabled: true
    },

    onLoad: function (options) {
        this.data.id = options.id;
        this.getArticleInfo();
    },

    getArticleInfo() {
        getArticleInfo({
            id: 3, //手动修改
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
            .replace(/<h2([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<h2')
            .replace(/<h2([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<h2')
            .replace(/<h2>/ig, '<h2 style="border-bottom: 1px solid #dfe2ef;padding: 0 0 1rem;font-size: 20px;">');
            this.setData({
                data: post
            });
        });
    },

    onShow: function () {
        getArticleInfo({
            id: 3, //手动修改
        }).then(res => {
            swan.setNavigationBarTitle({ title: res.data.post.Title });
            swan.setPageInfo({
                title: res.data.post.Title,
                keywords: res.data.post.Title,
                description: res.data.post.Title,
                articleTitle: res.data.post.Title
            })
        })
    }
});