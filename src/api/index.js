import axios from 'axios'
import { azpush, SDKinit, SDKLogin, SDKsignin, SDKnote, SDKmobiles, SDKlogout, SDKregisternew, SDKconsumption, SDKpayrecord, SDKcharacter, SDKpayPtb, SDKpay, SDKalipayptb, SDKsyfpayptb, SDKptbpay, SDKsyfpay, SDKupdatepw, SDKalipay, SDKauthentication, SDKmessage, SDKallmessage, SKDgamebag, SDKbindingMobile, SDKtakeBag, SDKsign, SDKuploadToken, SDKbackpw, SDKedit } from './config'
// import { Identity } from './Identity'

const URL = 'http://sdk.4cgame.com/index.php/'
axios.defaults.baseURL = URL
axios.defaults.headers.common['x-app'] = '4cgame_sdk'
axios.defaults.headers.post['Content-Type'] = 'application/json'
const config = {
  init: '/api/init.php?x-debug=1',
  login: '/api/login.php?x-debug=1',
  registerNew: '/api/registerNew.php?x-debug=1',
  registerOne: '/api/registerOne.php?x-debug=1',
  sendsms: '/api/sendsms.php?x-debug=1',
  backpw: '/api/backpw.php?x-debug=1',
  registerMobile: '/api/registerMobile.php?x-debug=1',
  consumption: '/api/consumption.php',
  payRecord: 'api/payRecord.php',
  logout: '/api/logout.php?x-debug=1',
  character: '/api/character.php?x-debug=1',
  payPtb: '/api/payPtb.php?x-debug=1',
  pay: '/api/pay.php?x-debug=1',
  alipay_ptb: '/api/alipay/alipay_ptb.php?x-debug=1',
  syfpay_ptb: '/api/syfpay/syfpay_ptb.php?x-debug=1',
  ptbpay: '/api/ptbpay/ptbpay.php?x-debug=1',
  syfpay: '/api/syfpay/syfpay.php?x-debug=1',
  updatepw: '/api/updatepw.php?x-debug=1',
  alipay: '/api/alipay/alipay.php?x-debug=1',
  bindingMobile: '/api/bindingMobile.php',
  nameAuthentication: 'api/realname.php',
  ActivityMessage: '/api/function.php',
  Allmessage: '/api/news.php',
  Gamebag: '/api/gift.php',
  TakeGameBag: '/api/getgift.php',
  sign: '/api/sign.php?x-debug=1',
  uploadToken: '/api/upload/token',
  uploadPost: '/api/upload/post',
  edit: '/api/edit.php?x-debug=1'
}

// 公共变量
var tempdata = {}

// 获取localStorage内对象
export const Getlocal = data => {
  return JSON.parse(localStorage.getItem(data)) || {}
}

// 对象传入localStorage
export const Setlocal = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

// 初始化
export const Init = data => {
  tempdata = SDKinit
  // tempdata.a = data.a // APPid
  // tempdata.x = data.x // 加密码SDK对接时会生成
  // tempdata.ab = data.ab // 版本号
  // tempdata.c = Identity.UUID(data.a)
  azpush(tempdata)
  return axios.post(config.init, tempdata).then(res => res.data).catch(err => err.msg)
}

// 一键快速注册
export const Signin = () => {
  tempdata = SDKsignin
  azpush(tempdata)
  return axios.post(config.registerOne, tempdata).then(res => res.data).catch(err => err.msg)
}
// 账号注册
export const RegisterNew = (name,pwd) => {
  tempdata = SDKregisternew
  tempdata.b = name
  tempdata.h = pwd
  azpush(tempdata)
  return axios.post(config.registerNew, tempdata).then(res => res.data).catch(err => err.msg)
}
// 手机号注册
export const Mobilesignin = data => {
  tempdata = SDKmobiles
  tempdata.s = data.phone
  tempdata.b = data.phone
  tempdata.h = data.password
  tempdata.r = data.verification
  // tempdata.c = Identity.UUID(tempdata.a)
  return axios.post(config.registerMobile, tempdata).then(res => res.data).catch(err => err.msg)
}
// 手机短信验证
export const Note = (phone, type) => {
  // console.log(data)
  tempdata = SDKnote
  tempdata.s = phone
  tempdata.q = type || 1 // 1.注册 2.忘记密码 3.绑定手机
  azpush(tempdata)
  return axios.post(config.sendsms, tempdata).then(res => res.data).catch(err => err.msg)
}
// 绑定手机
export const Bindingmobile = (p, s) => {
  tempdata = SDKbindingMobile
  tempdata.mobile = p
  tempdata.smscode = s
  tempdata.user_token = localStorage.userToken
  return axios.post(config.bindingMobile, tempdata).then(res => res.data).catch(err => err.msg)
}
// 登录
export const Login = data => {
  tempdata = SDKLogin
  // tempdata.a = JSON.parse(localStorage.Initparam).a // APPid
  // tempdata.e = JSON.parse(localStorage.Initparam).e // 所属渠道
  // tempdata.x = JSON.parse(localStorage.Initparam).x // 加密码SDK对接时会生成
  // tempdata.c = Identity.UUID(tempdata.a)
  tempdata.b = data.username
  tempdata.h = data.password
  azpush(tempdata)
  return axios.post(config.login, tempdata).then(res => res.data).catch(err => err.msg)
}
// 忘记密码接口
export const Backpw = data => {
  tempdata = SDKbackpw
  tempdata.h = data.password
  tempdata.r = data.verification
  tempdata.b = data.phone
  azpush(tempdata)
  return axios.post(config.backpw, tempdata).then(res => res.data).catch(err => err.msg)
}
// 修改密码接口
export const Updatepw = data => {
  tempdata = SDKupdatepw
  tempdata.h = data.oldpassword
  tempdata.am = data.newpassword
  tempdata.v = JSON.parse(localStorage.getItem('4CSDK-Login')).a
  azpush(tempdata)
  return axios.post(config.updatepw, tempdata).then(res => res.data).catch(err => err.msg)
}
// 消费记录
export const Consumption = data => {
  tempdata = SDKconsumption
  tempdata.z = data
  return axios.post(config.consumption, tempdata).then(res => res.data).catch(err => err.msg)
}
// 充值记录
export const Payrecord = data => {
  tempdata = SDKpayrecord
  tempdata.z = data
  return axios.post(config.payRecord, tempdata).then(res => res.data).catch(err => err.msg)
}
// 平台币充值初始化接口
export const Payptb = data => {
  tempdata = SDKpayPtb
  // tempdata.o = data.num
  tempdata.j = data.paytype
  tempdata.z = data.z
  tempdata.v = data.v
  return axios.post(config.payPtb, tempdata).then(res => res.data).catch(err => err.msg)
}
// 支付宝充值平台币
export const Alipayptb = (v, ai, aj, o, z) => {
  tempdata = SDKalipayptb
  // tempdata.o = o   // 固定金额
  tempdata.z = z
  tempdata.aj = aj
  tempdata.v = v
  tempdata.ai = ai
  azpush(tempdata)
  return axios.post(config.alipay_ptb, tempdata).then(res => res.data).catch(err => err.msg)
}
// 支付宝支付游戏币接口
export const Alipay = data => {
  tempdata = SDKalipay
  tempdata.o = data.o // 金额
  tempdata.ai = data.ai // 支付TOKEN
  tempdata.aj = data.aj // 订单号
  tempdata.a = data.a // app id
  tempdata.v = localStorage.userID
  tempdata.z = localStorage.userToken
  tempdata.x = data.x
  azpush(tempdata)
  return axios.post(config.alipay, tempdata).then(res => res.data).catch(err => err.msg)
}
// 微信充值平台币
export const Syfpayptb = (a, b, c, d, e) => {
  tempdata = SDKsyfpayptb
  tempdata.aj = a
  tempdata.z = b
  tempdata.v = c
  // tempdata.o = d
  tempdata.j = e
  return axios.post(config.syfpay_ptb, tempdata).then(res => res.data).catch(err => err.msg)
}
// 游戏币充值初始化接口
// a, c, e, i, k, l, m, o, p, x, ao, ap, userIp, packagename
export const Pay = data => {
  tempdata = SDKpay
  tempdata.a = data.a // APPid
  tempdata.c = data.c // 标识客户信息 IMEL
  tempdata.e = data.e // 所属渠道
  tempdata.i = data.i // 游戏区服信息
  tempdata.k = data.k // 充值商品名称
  tempdata.l = data.l // 充值商品描述
  tempdata.m = data.m // cp扩展参数
  tempdata.o = data.o // 充值金额
  tempdata.p = data.p // 玩家角色
  tempdata.x = data.x // 加密码SDK对接时会生成
  tempdata.ao = data.ao // 游戏区服ID
  tempdata.ap = data.ap // 角色ID
  tempdata.userIp = data.userIp // 用户IP
  tempdata.packagename = data.packagename // 应用包名
  tempdata.z = localStorage.userToken
  tempdata.v = localStorage.userID
  azpush(tempdata)
  return axios.post(config.pay, tempdata).then(res => res.data).catch(err => err.msg)
}
// 平台币支付游戏接口
export const Ptbpay = data => {
  tempdata = SDKptbpay
  tempdata.o = data.o
  tempdata.z= localStorage.userToken
  tempdata.v = localStorage.userID
  tempdata.ai = data.ai
  azpush(tempdata)
  return axios.post(config.ptbpay, tempdata).then(res => res.data).catch(err => err.msg)
}
// 微信支付游戏币
export const Syfpay = data => {
  tempdata = SDKsyfpay
  tempdata.a = data.a // APPid
  tempdata.e = data.e // 所属渠道
  tempdata.i = data.i // 游戏区服信息
  tempdata.k = data.k // 充值商品名称
  tempdata.l = data.l // 充值商品描述
  tempdata.m = data.m // cp扩展参数
  tempdata.o = data.o // 充值金额
  tempdata.p = data.p // 玩家角色
  tempdata.x = data.x // 加密码SDK对接时会生成
  tempdata.userIp = data.userIp // 用户IP
  tempdata.packagename = data.packagename // 应用包名
  tempdata.v = localStorage.userID
  tempdata.z = localStorage.userToken
  azpush(tempdata)
  return axios.post(config.syfpay, tempdata).then(res => res.data).catch(err => err.msg)
}
// 上传区服信息
export const Character = data => {
  tempdata = SDKcharacter
  tempdata.app_id = data.appId // appid
  tempdata.mem_id = data.localStorage.userID // 玩家ID
  tempdata.server = data.server // 游戏区服名称
  tempdata.server_id = data.serverId // 游戏大区ID
  tempdata.role = data.role // 角色名称
  tempdata.role_id = data.roleId // 角色id
  tempdata.level = data.level // 等级
  tempdata.guild = data.guild // 公会
  azpush(tempdata)
  return axios.post(config.character, tempdata).then(res => res.data).catch(err => err.msg)
}
// 退出登录
export const Logout = data => {
  tempdata = SDKlogout
  // tempdata.a = JSON.parse(localStorage.Initparam).a // APPid
  // tempdata.e = JSON.parse(localStorage.Initparam).e // 所属渠道
  // tempdata.x = JSON.parse(localStorage.Initparam).x // 加密码SDK对接时会生成
  tempdata.v = JSON.parse(localStorage.getItem('4CSDK-Login')).a
  tempdata.z = JSON.parse(localStorage.getItem('4CSDK-Login')).b
  azpush(tempdata)
  return axios.post(config.logout, tempdata).then(res => res.data).catch(err => err.msg)
}
// 实名认证
export const nameAuthentication = data => {
  tempdata.idcard = data.ID
  tempdata.name = data.name
  tempdata.mem_id = JSON.parse(localStorage.getItem('4CSDK-Login')).a
  tempdata.user_token = JSON.parse(localStorage.getItem('4CSDK-Login')).b
  return axios.post(config.nameAuthentication, tempdata).then(res => res.data).catch(err => err.msg)
}
// 活动消息接口
export const ActivityMessage = data => {
  tempdata = SDKmessage
  tempdata.user_token = JSON.parse(localStorage.getItem('4CSDK-Login')).b
  tempdata.app_id = 204
  return axios.post(config.ActivityMessage, tempdata).then(res => res.data).catch(err => err.msg)
}
// 所有消息接口
export const Allmessage = data => {
  tempdata = SDKallmessage
  tempdata.user_token = JSON.parse(localStorage.getItem('4CSDK-Login')).b
  tempdata.app_id = 204
  return axios.post(config.Allmessage, tempdata).then(res => res.data).catch(err => err.msg)
}
// 游戏礼包接口
export const Gamebag = (usertoken, memid) => {
  tempdata.user_token = JSON.parse(localStorage.getItem('4CSDK-Login')).b
  tempdata.mem_id = JSON.parse(localStorage.getItem('4CSDK-Login')).a
  return axios.post(config.Gamebag, tempdata).then(res => res.data).catch(err => err.msg)
}
// 礼包领取接口
export const TakeGameBag = data => {
  tempdata.gf_id = data.id
  tempdata.user_token = JSON.parse(localStorage.getItem('4CSDK-Login')).b
  tempdata.mem_id = JSON.parse(localStorage.getItem('4CSDK-Login')).a
  return axios.post(config.TakeGameBag, tempdata).then(res => res.data).catch(err => err.msg)
}
// 签到接口
export const sign = data => {
  tempdata = SDKsign
  tempdata.z = JSON.parse(localStorage.getItem('4CSDK-Login')).b
  tempdata.v = JSON.parse(localStorage.getItem('4CSDK-Login')).a
  return axios.post(config.sign, tempdata).then(res => res.data).catch(err => err.msg)
}
// 获取头像上传token 跨域未解决
export const UploadToken = data => {
  // $.ajax({
  //   type: 'POST',
  //   url: 'http://upload.4cgame.com/index.php/api/upload/token',
  //   dataType: 'json',
  //   success: function (data) {
  //   }
  // })
  return axios.post('http://upload.4cgame.com/index.php' + config.uploadToken).then(res => res.data)
  // return axios.post('http://upload.4cgame.com/index.php' + config.uploadToken, tempdata).then(res => console.log(res.data)).catch(err => err.msg)
}
// 上传头像接口
export const Post = data => {
  tempdata.file = data
  tempdata.z = localStorage.userToken
  return axios.post('http://upload.4cgame.com/index.php' + config.post, tempdata).then(res => res.data).catch(err => err.msg)

}

// 用户头像设置
export const Edit = () => {
  tempdata = SDKedit
  tempdata.z = localStorage.userToken
  tempdata.v = localStorage.userID
  return axios.post(config.edit, tempdata).then(res => res.data).catch(err => err.msg)
}
