import md5 from 'md5'
import { Time } from './Time'
import { CMD5 } from './CMD5.js'
import Cookie from 'js-cookie'
var game = new CMD5();
game.getALL();

const f = function () {
  var msg = navigator.userAgent
  var arr = []
  msg.indexOf(' (') ? arr = msg.split(' (') : arr = msg.split('(')
  msg = arr.slice(1).toString()
  msg.indexOf(') ') ? arr = msg.split(') ') : arr = msg.split(')')
  arr[0] = arr[0].split('; ')
  if (arr[0][0] === 'Linux') {
    arr[0] = arr[0].slice(1).join(';')
  }
  arr[1] = arr[1].split(',').slice(0, 1).toString()
  var res = arr.join('||')

  return res
}
var a = 204
var app_id = a
var x = 204
var clientkey = 'b51b4396c94bf84c782856fd5acf64a9'
const y = function (request, w, clientkey) {
  // var day = new Date()
  // var Month = day.getMonth() < 9 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1
  // var Day = day.getDate() < 10 ? '0' + day.getDate() : day.getDate()
  // var date = day.getFullYear() + '-' + Month + '-' + Day
  var code = request + Time.date('Y-m-d') + w + clientkey
  return md5(code)
}

const az = function ($urldata) {
  var az = 'a=' + $urldata['a'] + '&b=' + $urldata['b'] + '&c=' + $urldata['c'] + '&d=' + $urldata['d']
  az += '&e=' + $urldata['e'] + '&f=' + $urldata['f'] + '&g=' + $urldata['g'] + '&h=' + $urldata['h']
  az += '&i=' + $urldata['i'] + '&j=' + $urldata['j'] + '&k=' + $urldata['k'] + '&l=' + $urldata['l']
  az += '&m=' + $urldata['m'] + '&n=' + $urldata['n'] + '&o=' + $urldata['o'] + '&p=' + $urldata['p']
  az += '&q=' + $urldata['q'] + '&r=' + $urldata['r'] + '&s=' + $urldata['s'] + '&t=' + $urldata['t']
  az += '&u=' + $urldata['u'] + '&v=' + $urldata['v'] + '&w=' + $urldata['w'] + '&x=' + $urldata['x']
  az += '&y=' + $urldata['y'] + '&z=' + $urldata['z'] + '&ab=' + $urldata['ab'] + '&ac=' + $urldata['ac']

  return az
}
// 初始化
var SDKinit = {
  a,
  c: Cookie.get('c'),
  d: 2,
  f: f(),
  g: navigator.userAgent,
  w: 0,
  x,
  y: y('init', 0, clientkey),
  ab: 1,
  an: 1
}
// 登录
var SDKLogin = {
  a,
  b: '',
  c: Cookie.get('c'),
  d: 2,
  e: 'default',
  f: f(),
  g: navigator.userAgent,
  h: '',
  w: 0,
  x,
  y: y('login', 0, clientkey),
  ac: '中国广东广州市'
}
// 账号注册
var SDKregisternew = {
  a,
  b: '',
  d: 2,
  e: 'default',
  f: f(),
  g: navigator.userAgent,
  h: '',
  w: 0,
  x,
  y: y('registerNew', 0, clientkey),
  ac: '中国广东广州市'
}
// 一键获取注册账号
var SDKsignin = {
  a,
  d: 2,
  e: 'default',
  f: f(),
  g: navigator.userAgent,
  w: 0,
  x,
  y: y('registerOne', 0, clientkey)
}
// 手机短信验证
var SDKnote = {
  q: 1,
  s: '',
  w: 0,
  x,
  y: y('sendsms', 0, clientkey)
}
// 手机号注册
var SDKmobiles = {
  a,
  b: '', // 账户
  c: Cookie.get('c'),
  d: 2,
  e: 'default',
  f: f(),
  g: navigator.userAgent,
  h: '', // 密码
  r: '', // 验证码
  s: '', // 手机号
  w: 0,
  x,
  y: y('registerMobile', 0, clientkey),
  ac: '中国广东广州市'
}
// 绑定手机号
var SDKbindingMobile = {
  mobile: '',
  smscode: '',
  user_token: ''
}
// 忘记密码
var SDKbackpw = {
  a,
  s: '',
  b: '',
  h: '',
  r: '',
  x,
  w: 0,
  y: y('backpw', 0, clientkey)
}
// 充值平台币初始化
var SDKpayPtb = {
  a,
  d: 2,
  f: f(),
  g: navigator.userAgent,
  e: 'default',
  j: '',
  o: '1', // 金额固定
  v: '',
  w: 0,
  x,
  y: y('payPtb', 0, clientkey),
  z: '',
  ac: '中国广东广州市'
}
// 充值游戏币初始化
var SDKpay = {
  a,
  c: Cookie.get('c'),
  d: 2,
  e: 'default',
  f: f(),
  g: navigator.userAgent,
  i: '广东一区',
  k: '神器A',
  l: 'xxx',
  m: '163600',
  o: '2',
  p: '小明',
  v: '',
  w: 0,
  x,
  y: y('pay', 0, clientkey),
  z: '',
  ac: '中国广东广州市',
  ao: 1,
  ap: '10001000995',
  user_ip: '116.21.15.171',
  packagename: 'com.tianqisdk.demo'
}
// 支付宝充值平台币
var SDKalipayptb = {
  w: 0,
  v: '',
  d: 2,
  ai: '',
  aj: '',
  a,
  o: '1',
  y: y('alipay_ptb', 0, clientkey),
  x,
  z: ''

}
// 支付宝支付游戏币
var SDKalipay = {
  a,
  d: 2,
  o: '',
  v: '',
  w: 0,
  x,
  y: y('alipay', 0, clientkey),
  z: '',
  ai: '', // 支付token
  aj: '' // 订单号
}
// 微信充值平台币
var SDKsyfpayptb = {
  a,
  d: 2,
  e: 'default',
  j: '',
  o: '1', // 固定金额
  v: '163600',
  w: 0,
  x,
  y: y('syfpay_ptb', 0, clientkey),
  z: '',
  aj: '',
  user_ip: '116.21.14.86',
  packagename: 'com.tianqisdk.demo'
}
// 平台币充值游戏币
var SDKptbpay = {
  a,
  d: 2,
  n: 1, // 平台币
  o: '', // 充值金额
  v: '',
  w: 0,
  x,
  y: y('ptbpay', 0, clientkey),
  z: '',
  ai: ''// 支付token
}
// 微信支付游戏币
var SDKsyfpay = {
  a,
  d: 2,
  e: 'default',
  f: f(),
  g: navigator.userAgent,
  i: '广东一区',
  K: '神器A',
  l: 'xxx',
  m: '163600',
  o: '2.00',
  p: '小明',
  v: '',
  w: 0,
  x,
  y: y('syfpay', 0, clientkey),
  z: '',
  user_ip: '116.21.15.171',
  packagename: 'com.tianqisdk.demo'
}

// 修改密码接口
var SDKupdatepw = {
  h: '', // 用户密码获取
  v: '',
  w: 0,
  x,
  y: y('updatepw', 0, clientkey),
  am: ''// 新密码获取
}
// 消费记录
var SDKconsumption = {
  y: y('consumption', 0, clientkey),
  z: ''
  // page: 1,    // 分页
  // len: 10
}
// 充值记录
var SDKpayrecord = {
  y: y('payRecord', 0, clientkey),
  z: ''
  // page: 1,   // 分页
  // len: 10
}
// 退出登录
var SDKlogout = {
  a,
  d: 2,
  e: '',
  f: f(),
  g: navigator.userAgent,
  v: '', // 用户ID
  w: 0,
  x,
  y: y('logout', 0, clientkey),
  z: ''
}
// 上传区服信息
var SDKcharacter = {
  app_id,
  mem_id: '', // 玩家ID
  server: '',
  server_id: '',
  role: '张三',
  role_id: '',
  level: '',
  guild: ''

}
// 实名认证请求数据
var SDKauthentication = {
  user_token: '',
  mem_id: ''
}

// 活动接口请求数据
var SDKmessage = {
  user_token: '',
  app_id
}
// 所有消息请求数据
var SDKallmessage = {
  user_token: '',
  app_id
}
// 游戏礼包接口
var SKDgamebag = {
  user_token: '',
  mem_id: '',
  app_id
}
// 礼包领取接口
var SDKtakeBag = {
  user_token: '',
  mem_id: 0
}
// 签到接口
var SDKsign = {
  v: '',
  w: 0,
  x,
  y: y('sign', 0, clientkey),
  z: ''
}
// 获取头像上传token
var SDKuploadToken = {
  file: '',
  type: 'image'
}
// 用户头像信息设置
var SDKedit = {
  x,
  z: '',
  y: y('edit', 0, clientkey),
  ar: 'http://file.4cgame.com/20180519/5813a20dafc42451be99d2b9c9560142.jpg',
  w: 0,
  v: ''
}
export const azpush = function (SDKparams) {
  SDKparams.az = md5(md5(az(SDKparams)) + clientkey)
  return SDKparams
}

export { clientkey, SDKinit, SDKLogin, SDKregisternew, SDKsignin, SDKmobiles, SDKnote, SDKconsumption, SDKpayrecord, SDKlogout, SDKcharacter, SDKpayPtb, SDKpay, SDKalipayptb, SDKsyfpayptb, SDKptbpay, SDKsyfpay, SDKupdatepw, SDKalipay, SDKauthentication, SDKmessage, SDKallmessage, SKDgamebag, SDKbindingMobile, SDKtakeBag, SDKsign, SDKuploadToken, SDKbackpw, SDKedit }
