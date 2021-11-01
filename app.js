//app.js

App({
    onLaunch: function () {
        // 记录网络状态
        console.log(new Date)
        swan.getNetworkType({
            success: res => {
                this.globalData.networkType = res.networkType;
            }
        });
        swan.onNetworkStatusChange(res => {
            this.globalData.networkType = res.networkType;
        });
    },
    onPrefetch({query, scene, trigger}) {
        console.log('page index prefetch', query, scene, trigger);
    },
    globalData: {
        openParams: 'docWeb',
        setting: null
    }

});

