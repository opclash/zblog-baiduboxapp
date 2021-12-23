import config from '../config.js';

const api = config.domain + '/zb_system/api.php';

const urls = {
  settings: api + '?mod=yuran&act=info',
  home: api + '?mod=post&act=list&sortby=PostTime&order=desc',
  sortslist: api + '?mod=category&act=list&sortby=Order',
  articleinfo: api + '?mod=post',
  category: api + '?mod=category&act=get',
  smtform: api + '?mod=yuran&act=smtform',
  asklist: api + '?mod=yuran&act=asklist',
  askinfo: api + '?mod=yuran&act=askinfo',
  cloudCache: config.cloudCache
};

export default urls;