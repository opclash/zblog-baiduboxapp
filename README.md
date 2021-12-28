
<h2>zblog-baiduboxapp</h2>
<P>Zblog 1.7.1 百度小程序源码，采用 Zblog 原生API协议，开发后台基于 Zblog 测试版，为 Z-Blog 做出一点点微不足道的贡献，希望它会更好！</P>
<p align="center">
<a href="https://gitee.com/link?target=https%3A%2F%2Fa.paddle.com%2Fv2%2Fclick%2F16413%2F119403%3Flink%3D1227">
<img src="https://img.shields.io/badge/zblog%20baiduboxapp-By%20彧%20繎%20叔%20叔%20-gray.svg?colorA=655BE1&amp;colorB=4F44D6&amp;style=for-the-badge">
</a>
<a href="https://gitee.com/link?target=https%3A%2F%2Fa.paddle.com%2Fv2%2Fclick%2F16413%2F119403%3Flink%3D2345">
<img src="https://img.shields.io/badge/yuran%20zixun-https://%20opssh.cn%20%E2%86%92-gray.svg?colorA=61c265&amp;colorB=4CAF50&amp;style=for-the-badge">
</a>
</p>

<h2>小程序依赖</h2>
<li>依赖Z-Blog 1.7.1 的API接口，无需任何插件</li>
<li>打开后台->网站设置->API设置，打开 启用API协议开关 并提交即可</li>

<h2>服务器方面</h2>
<li>开启 https</li>
<li>SSL加密证书配置一定要正确，不然可能导致加载白屏</li>

<h2>使用说明</h2>
<li>修改源代码 config.js 内的 域名</li>
<li>修改源代码 project.swan.json 内的 appid</li>
<li>修改源代码 \pages\search\index.js 内的 appkey</li>
<li>上传到百度小程序后台 robots.txt 文件，审核前就上传</li>

<h2>反馈中心地址</h2>
<li>肠胃炎犯了，更新有点慢</li>
<li>遇到问题可以留言，有什么想法也可以留言</li>
<li>我也尽量去实现，免费开源版本没有限制，可以配合插件二次开发</li>
<li>https://opssh.cn/fenxiang/35.html</li>

<h2>演示看这里</h2>
<p align="center">
<img src="https://oss.opssh.cn/zb_users/upload/2021/11/202111212401_814.png">
</p>

<h2>小程序特色</h2>
<li>新增 yuran_zixun 百度小程序插件</li>
<li>使用 Zblog 1.7.1 原生API接口</li>
<li>小程序集成 swan-sitemap 索引页</li>
<li>文章页集成 swan.setPageInfo </li>
<li>添加 一站式互动组件</li>
<li>添加 一键关注</li>
<li>引用 mp-html 组件</li>
<li>支持 视频、音频播放</li>
<li>拥有 首页、列表页、独立页</li>

<h2>robots说明</h2>
<li>小程序资源抓取 robots 文件配置，请查看源代码根目录下的 robots.txt</li>
<li>如果允许其他搜索引擎抓取删除 User-agent: * Disallow: /</li>
<li>目前只发现神马、搜索会收录</li>
