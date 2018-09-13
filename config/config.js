import md5 from 'md5'
// import { Time } from './Time'

const f = function () {
  // console.log(navigator.userAgent)
  var msg = navigator.userAgent
  // console.log(msg.length)

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
  // console.log(res)

  return res
}

const y = function (request, w, gamekey) {
  var day = new Date()
  var Month = day.getMonth() < 9 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1
  var Day = day.getDate() < 10 ? '0' + day.getDate() : day.getDate()
  var date = day.getFullYear() + '-' + Month + '-' + Day
  var code = request + date + w + gamekey
  // console.log(gamekey)
  // console.log(code)
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
// const z = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZW1faWQiOjE2MzYwMCwidWlkIjoxNjM2MDAsImFwcF9pZCI6NSwidGltZSI6MTUzMDIzNzA1OSwiY29kZSI6MCwiYWdlbnQiOiJkZWZhdWx0IiwiY2xpZW50a2V5IjoiIiwidXNlcm5hbWUiOiJ0cTE4ODE5Mjc2NDc4IiwiZXhwaXJlIjoxNTMwMjgwMjU5LCJzY29wZSI6InBsYXRmb3JtIn0.YNPpWiqZo6s5b5MkyBnOC0Ukaa-j7XUBwjFDQQV2oVE'
// const v = '163600'
// 初始化
var SDKinit = {
  a: 1,
  c: '353610070666325',
  d: 2,
  f: f(),
  g: navigator.userAgent,
  w: 0,
  x: 1,
  y: y('init', 0, '36ba570b88802fd382d65c627e15f697'),
  ab: 1,
  an: 1
}
// 登录
var SDKLogin = {
  a: 1,
  b: '',
  c: '353610070666325',
  d: 2,
  e: 'default',
  f: f(),
  g: navigator.userAgent,
  h: '',
  w: 0,
  x: 1,
  y: y('login', 0, '36ba570b88802fd382d65c627e15f697'),
  ac: '中国广东广州市'
}
// 账号注册
var SDKregisternew = {
  a: 1,
  b: '',
  d: 2,
  e: 'default',
  f: f(),
  g: navigator.userAgent,
  h: '',
  w: 0,
  x: 1,
  y: y('registerNew', 0, '36ba570b88802fd382d65c627e15f697'),
  ac: '中国广东广州市'
}
// 一键获取注册账号
var SDKsignin = {
  a: 1,
  // b: 'admin',
  d: 2,
  e: 'default',
  f: f(),
  g: navigator.userAgent,
  w: 0,
  x: 1,
  y: y('registerOne', 0, '36ba570b88802fd382d65c627e15f697')
}
// 手机短信验证
var SDKnote = {
  q: 1,
  s: '',
  w: 0,
  x: 1,
  y: y('sendsms', 0, '36ba570b88802fd382d65c627e15f697')
}
// 手机号注册
var SDKmobiles = {
  a: 1,
  b: '', // 账户
  c: '353610070666325',
  d: 2,
  e: 'default',
  f: f(),
  g: navigator.userAgent,
  h: '', // 密码
  r: '', // 验证码
  s: '', // 手机号
  w: 0,
  x: 1,
  y: y('registerMobile', 0, '36ba570b88802fd382d65c627e15f697'),
  ac: '中国广东广州市'
}
// 绑定手机号
var SDKbindingMobile = {
  z: ''
}
// 充值平台币初始化
var SDKpayPtb = {
  a: 1,
  d: 2,
  f: f(),
  g: navigator.userAgent,
  e: 'default',
  j: '',
  o: '1',   // 金额固定
  v: '',
  w: 0,
  x: 1,
  y: y('payPtb', 0, '36ba570b88802fd382d65c627e15f697'),
  z: '',
  ac: '中国广东广州市'
}
// 充值游戏币初始化
var SDKpay = {
  a: 1,
  c: '353610070666325',
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
  x: 1,
  y: y('pay', 0, '36ba570b88802fd382d65c627e15f697'),
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
  ai:'',
  aj: '',
  a: 1,
  o: '',
  z: '',
  y: y('alipay_ptb', 0, '36ba570b88802fd382d65c627e15f697'),
  x:1

}
// 支付宝支付游戏币
var SDKalipay = {
  a: 1,
  d: 2,
  o: 100,
  v: '',
  w: 0,
  x: 1,
  y: y('alipay', 0, '36ba570b88802fd382d65c627e15f697'),
  z: '',
  ai: '', // 支付token
  aj: '' // 订单号
}
// 微信充值平台币
var SDKsyfpayptb = {
  a: 1,
  d: 2,
  e: 'default',
  j: '',
  o: '1',   // 固定金额
  v: '163600',
  w: 0,
  x: 1,
  y: y('syfpay_ptb', 0, '36ba570b88802fd382d65c627e15f697'),
  z: '',
  aj: '',
  user_ip: '116.21.14.86',
  packagename: 'com.tianqisdk.demo'
}
// 平台币充值游戏币
var SDKptbpay = {
  a: 1,
  n: 1, // 平台币
  o: '', // 充值金额
  v: '',
  w: 0,
  x: 1,
  y: y('ptbpay', 0, '36ba570b88802fd382d65c627e15f697'),
  z: '',
  ai: ''// 支付token
}
// 微信支付初始化
var SDKsyfpay = {
  a: 1,
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
  x: 1,
  y: y('syfpay', 0, '36ba570b88802fd382d65c627e15f697'),
  z: '',
  user_ip: '116.21.15.171',
  packagename: 'com.tianqisdk.demo'
}

// 修改密码接口
var SDKupdatepw = {
  h: '', // 用户密码获取
  v: '',
  w: 0,
  x: 1,
  y: y('updatepw', 0, '36ba570b88802fd382d65c627e15f697'),
  am: ''// 新密码获取
}
// 消费记录
var SDKconsumption = {
  y: y('consumption', 0, '36ba570b88802fd382d65c627e15f697'),
  z: '',
  page: 1,
  len: 10
}
// 充值记录
var SDKpayrecord = {
  y: y('payRecord', 0, '36ba570b88802fd382d65c627e15f697'),
  z: '',
  page: 1,
  len: 10
}
// 退出登录
var SDKlogout = {
  a: 1,
  b: '',
  d: 2,
  e: 'default',
  f: f(),
  g: navigator.userAgent,
  v: '', // 玩家ID
  w: 0,
  x: 1,
  y: y('logout', 0, '36ba570b88802fd382d65c627e15f697'),
  z: ''
}
var SDKcharacter = {
  app_id: 5
}
// 实名认证请求数据
var SDKauthentication = {
  user_token: '',
  mem_id: ''
}

// 活动接口请求数据
var SDKmessage = {
  user_token: '',
  app_id: 1
}
// 所有消息请求数据
var SDKallmessage = {
  user_token: '',
  app_id: 1
}
// 游戏礼包接口
var SKDgamebag = {
  user_token: '',
  mem_id: '',
  app_id: 1
}
// 礼包领取接口
var SDKtakeBag = {
  user_token: '',
  mem_id: 0
}
export const azpush = function (SDKparams) {
  SDKparams.az = md5(md5(az(SDKparams)) + '36ba570b88802fd382d65c627e15f697')
  return SDKparams
}

export { SDKinit, SDKLogin, SDKregisternew, SDKsignin, SDKmobiles, SDKnote, SDKconsumption, SDKpayrecord, SDKlogout, SDKcharacter, SDKpayPtb, SDKpay, SDKalipayptb, SDKsyfpayptb, SDKptbpay, SDKsyfpay, SDKupdatepw, SDKalipay, SDKauthentication, SDKmessage, SDKallmessage, SKDgamebag, SDKbindingMobile, SDKtakeBag }
