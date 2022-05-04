// 列表
const app = getApp();
import { getSortsList } from '../../utils/request.js';

Page({
    // 使用一个标记位，确保只请求一次主数据
	hasRequest: false,
    data: {
        state: true,
        id: '',
        title: '',
        intro: '',
        page: '1',
        navList: []
    },

    onInit () {
		if (!this.hasRequest) {
			this.hasRequest = true;
            this.getSortsList();
		}
    },

    getSortsList() {
        getSortsList({
            'root_id': 0
        }).then(res => {
            var datas = res.data.list;
            this.setData({
                navList: this.data.navList.concat(datas)
            });
        });
    },

    // 查看详情
    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/list/index?id=' + id
        });
    }

});