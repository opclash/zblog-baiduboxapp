import { toDate } from '../utils/tool.js';
Page({
    data: {
        listData: [],
        totalPage: 1,
        currentPage: 1,
        path: 'swan-sitemap/index'
    },

    onLoad(e) {
        // 初始页面打开时，需要读取页面的 currentPage 参数（即翻页页码），并根据参数值请求数据
        let { currentPage } = e;
        // 起始页码为 1，如读取到的值为空，默认赋值起始页码
        currentPage = +currentPage || 1;
        // 根据当前页码获取该页数据资源
        this.requestData(currentPage);
    },

    requestData(currentPage) {
        // 发起数据资源请求。
        swan.request({
            // 数据接口，需改为开发者实际的请求接口
            url: 'https://opssh.cn/zb_system/api.php?mod=post&act=list&sortby=ID&order=desc',

            header: {
                'content-type': 'application/json',
                ' Cache-Control': 'max-age=43200'
            },
            data: {
                // 参数中需携带页码参数，此为示例，可根据实际情况传入其他所需参数
                page: currentPage
            },

            // 开启云加速服务
            cloudCache: true,
            // 控制当前请求是否延时至首屏内容渲染后发送
            defer: true,
            success: res => {

                if (res.statusCode === 200) {
                    let resData = res.data;
                    let list = resData.data.list
                    // 根据返回数据更新列表。如请求返回格式不符合模板数据 listData 的要求格式，需调整格式后再赋值给 listData。
                    // listData 的格式要求为：
                    // Array<{title:string, path:string, releaseDate:DateString}>，详见下节 “list-data 项格式说明”

                    for (var i = 0; i < resData.data.list.length; i++) {
                        resData.data.list[i]["PostTime"] = toDate(Number(resData.data.list[i]["PostTime"]) * 1000, 1);
                    }

                    let newTecherList = list.map(item => ({
                        title: item.Title,
                        path: '/pages/article/index?id=' + item.ID,
                        releaseDate: item.PostTime
                    }))

                    this.setData({
                        listData: newTecherList,
                        totalPage: resData.data.pagebar.PageAll,
                        currentPage
                    });
                    console.log(this.data.listData);
                }
            }
        });
    },

    onShow: function () {
        swan.setPageInfo({
            title: '索引页',
            keywords: '索引页',
            description: '自动同步指通过索引页的方式让开发者通过一次开发和提交，将小程序资源提交给百度。索引页即一个小程序页面，页面内容为站点所有资源链接列表，每个链接指向一个对应的资源小程序页。',
            articleTitle: '索引页'
        })
    }
});
