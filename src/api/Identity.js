import lodash from 'lodash'
import { Store } from './Store'
import Event from './Event'
import $ from 'jquery'
import axios from 'axios'
import { Encrypt } from './Encrypt'
const TaoService = 'http://ip.taobao.com/service/getIpInfo.php?ip=myip'
const ONE_DAY = 1
const USER_DATA = 'sdkdata'

/**
 * 用户身份认证工具类
 */
class Identity {
  /**
   * 获取内网ip
   */
  static localIp () {
    const notify = (ip) => {
      if (lodash.isNil($('#' + USER_DATA))) {
        let data = '<div class=' + USER_DATA + ' style="display:none"></div>'
        $('body').appendTo(data)
        $('#' + USER_DATA).data('localip', ip)
      }
      Event.add('localIp', data => $('html').data('localip', data.args))
      Event.emit('localIp', ip, true)
      // cookie save one day
      Store.Instance().set('localIp', ip, ONE_DAY)
    }
    let ipDups = {}
    // compatibility for firefox and chrome
    let RTCPeerConnection = window.RTCPeerConnection ||
                window.mozRTCPeerConnection ||
                window.webkitRTCPeerConnection
    // bypass naive webrtc blocking
    if (!RTCPeerConnection) {
      let iframe = document.createElement('iframe')
      // invalidate content script
      iframe.sandbox = 'allow-same-origin'
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
      let win = iframe.contentWindow
      window.RTCPeerConnection = win.RTCPeerConnection
      window.mozRTCPeerConnection = win.mozRTCPeerConnection
      window.webkitRTCPeerConnection = win.webkitRTCPeerConnection
      RTCPeerConnection = window.RTCPeerConnection ||
                    window.mozRTCPeerConnection ||
                    window.webkitRTCPeerConnection
    }
    // minimal requirements for data connection
    let mediaConstraints = {
      optional: [{RtpDataChannels: true}]
    }
    // firefox already has a default stun server in about:config
    //    media.peerconnection.default_iceservers =
    //    [{"url": "stun:stun.services.mozilla.com"}]
    let servers
    // add same stun server for chrome
    if (window.webkitRTCPeerConnection) { servers = {iceServers: [{urls: 'stun:stun.services.mozilla.com'}]} }
    // construct a new RTCPeerConnection
    let pc = new RTCPeerConnection(servers, mediaConstraints)
    // listen for candidate events
    pc.onicecandidate = function (ice) {
      // skip non-candidate events
      if (ice.candidate) {
        // match just the IP address
        let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
        let ipAddr = ipRegex.exec(ice.candidate.candidate)[1]

        // remove duplicates
        if (ipDups[ipAddr] === undefined) { notify(ipAddr) }
        ipDups[ipAddr] = true
      }
    }
    // create a bogus data channel
    pc.createDataChannel('')
    // create an offer sdp
    pc.createOffer(function (result) {
      // trigger the stun server request
      pc.setLocalDescription(result, function () {}, function () {})
    }, function () {})
  }

  /**
   * 获取 用户公网ip
   */
  static netIp () {
    return axios.get(TaoService)
      .then(response => {
        if (lodash.isNil(response) || !lodash.isObject(response)) {
          console.warn('error response is null')
          return false
        }
        if (lodash.has(response, ['data', 'data.ip', 'data.country', 'data.region', 'data.city', 'data.country_id', 'data.region_id'])) {
          $('#' + USER_DATA).data('remoteIp', response.data.ip)
          Store.Instance().set('remoteIp', response.data)
        }
      }).catch(err => {
        console.error(err)
      })
  }

  /**
   * 获取 用户 设备信息
   */
  static deveicInfo () {
    let info = null
    let ua = Identity.userAgent()
    if (lodash.isNil(ua) || !lodash.isString(ua)) {
      return info
    }
    let tmp = ua.trim().split('(')
    return tmp.join()
  }

  static userAgent () {
    try {
      if (!lodash.isObject(window)) {
        console.log('window object not exists')
        return null
      }
      if (!lodash.has(window, ['navigator'])) {
        console.log('window object not has navigator may you browser is too old')
        return null
      }
      let nav = window.navigator
      if (lodash.isNil(nav)) {
        return null
      }
      let ua = nav.userAgent
      return ua
    } catch (e) {
      console.log(e)
    }
    return null
  }

  /**
   * 平台 设备标识符
   */
  static UUID (appId) {
    return Encrypt.encode(appId + Identity.getLocalIp() + Identity.getRemoteIp() + Identity.userAgent())
  }

  static getLocalIp () {
    let ip = Store.Instance().get('localIp')
    if (lodash.isNil(ip)) {
      Identity.localIp()
      return Store.Instance().get('localIp')
    }
    return ip
  }

  static getRemoteIp () {
    let ip = Store.Instance().get('remoteIp')
    if (lodash.isNil(ip)) {
      Identity.localIp()
      return Store.Instance().get('remoteIp')
    }
    return ip
  }

  static init () {
    Identity.localIp()
    Identity.netIp()
  }
}

export { Identity }
