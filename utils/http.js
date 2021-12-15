import config from '../config.js';

const api = config.domain + '/zb_system/api.php';

const urls = {
  home: api + '?mod=post&act=list&sortby=PostTime&order=desc',
  sortslist: api + '?mod=category&act=list&sortby=Order',
  articleinfo: api + '?mod=post',
  category: api + '?mod=category&act=get',
  cloudCache: config.cloudCache
};
// 接口输出
export default urls;