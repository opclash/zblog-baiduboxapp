// 列表
import { getsortslist } from '../../utils/request.js';
import { toDate, formatMsgTime } from '../../utils/tool.js';

const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        state: true,
        id: '',
        title: '',
        intro: '',
        page: '1',
        navList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getsortslist();
    },

    getsortslist() {
        var _then = this;
        getsortslist({
            'root_id': 0
        }).then(res => {
            var datas = res.data.list;
            _then.setData({
                navList: _then.data.navList.concat(datas)
            });
        });
    },

    // 查看详情
    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/list/index?id=' + id
        });
    },
    /**
 * 生命周期函数--监听页面显示
 */
    onShow: function () {

        swan.setNavigationBarTitle({ title: "分类中心" });
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.refresh();
    }

});