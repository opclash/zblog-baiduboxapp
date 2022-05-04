// 详情页
const app = getApp();
import utils from '../../utils/request.js';
Page({
    // 使用一个标记位，确保只请求一次主数据
    hasRequest: false,

    data: {
        id: '',
        disabled: true
    },

    onInit: function (options) {
		if (!this.hasRequest) {
            this.hasRequest = true;
            this.data.id = options.id;
            this.getArticleInfo();
		}
    },

    getArticleInfo() {
        utils.getArticleInfo({
            id: '你的ID',
        }).then(res => {
            const post = res.data.post;
            post.Content=utils.htmlspecialchars(post.Content);
            this.setData({
                data: post
            });
        });
    }
});