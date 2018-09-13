import $ from 'jquery'
import md5 from 'md5'
import Cookie from 'js-cookie'

function CMD5() {
  this.localIP = null;
  this.netIP = null;
  this.jiami = null;
  this.userAgent = navigator.userAgent
}

//本地IP
CMD5.prototype.getIPs = function (callback) {
  var ip_dups = {};
  // compatibility for firefox and chrome
  var RTCPeerConnection = window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;
  var useWebKit = !!window.webkitRTCPeerConnection;
  // bypass naive webrtc blocking using an iframe
  if (!RTCPeerConnection) {
    // NOTE: you need to have an iframe in the page right above the script tag
    //
    // <iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
    // <script>...getIPs called in here...
    //
    var win = iframe.contentWindow;
    RTCPeerConnection = win.RTCPeerConnection ||
      win.mozRTCPeerConnection ||
      win.webkitRTCPeerConnection;
    useWebKit = !!win.webkitRTCPeerConnection;
  }
  // minimal requirements for data connection
  var mediaConstraints = {
    optional: [{
      RtpDataChannels: true
    }]
  };
  var servers = {
    iceServers: [{
      urls: "stun:stun.services.mozilla.com"
    }]
  }
  // construct a new RTCPeerConnection
  var pc = new RTCPeerConnection(servers, mediaConstraints)

  function handleCandidate(candidate) {
    // match just the IP address
    var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
    var ip_addr = ip_regex.exec(candidate)[1]
    // remove duplicates
    if (ip_dups[ip_addr] === undefined)
      callback(ip_addr)
    ip_dups[ip_addr] = true
  }
  // listen for candidate events
  pc.onicecandidate = function (ice) {
    // skip non-candidate events
    if (ice.candidate)
      handleCandidate(ice.candidate.candidate)
  }
  //create a bogus data channel
  pc.createDataChannel("")
  //create an offer sdp
  pc.createOffer(function (result) {
    //trigger the stun server request
    pc.setLocalDescription(result, function () {}, function () {});
  }, function () {})
  //wait for a while to let everything done
  setTimeout(function () {
    //read candidate info from local description
    var lines = pc.localDescription.sdp.split('\n');
    lines.forEach(function (line) {
      if (line.indexOf('a=candidate:') === 0)
        handleCandidate(line)
    })
  }, 1000)
}

//公网IP
CMD5.prototype.networkIP = function () {
  var self = this
  $.ajax({
    type: 'GET',
    url: 'http://sdk.4cgame.com/index.php/api/ip',
    success: function (data) {
      self.netIP = data.data.ip
    }
  })
}
CMD5.prototype.getALL = function () {
  var self = this;
  this.getIPs(function (ip) {
    var li = document.createElement("li");
    li.textContent = ip;
    //local IPs
    if (ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
      self.localIP = ip
    }
    //IPv6 addresses
    else if (ip.match(/^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/)) {
      self.localIP = ip
    }
    //assume the rest are public IPs
    else {
      self.localIP = ip
    }
  });
  this.networkIP();
  var timer = setInterval(function () {
    if (self.localIP != null && self.netIP != null) {
      var MD5 = self.localIP + self.netIP + self.userAgent
      if (Cookie.get('c')) {
        self.jiami = Cookie.get('c');
      } else {
        self.jiami = md5(MD5)
        Cookie.set('c', self.jiami, {
          expires: 100000
        });
      }
      clearInterval(timer)
    }
  }, 1000)
}

export {
  CMD5
}
