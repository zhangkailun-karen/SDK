import lodash from 'lodash'

class Types {
  // 接口参数列表
  static apiParamsTable = {
    'init': ['a', 'c', 'd', 'f', 'g', 'w', 'x', 'y', 'az', 'ab', 'an'],
    'login': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'w', 'x', 'y', 'az', 'ac'],
    'function': [],
    'payPtb': [],
    'sendsms': ['q', 's', 'w', 'x', 'y', 'az'],
    'news': [],
    'registerNew': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'w', 'x', 'y', 'az', 'ac'],
    'registerOne': ['a', 'b', 'e', 'f', 'g', 'w', 'x', 'y', 'az'],
    'registerMobile': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'r', 's', 'w', 'x', 'y', 'az', 'ac'],
    'logout': ['a', 'b', 'd', 'e', 'f', 'g', 'v', 'w', 'x', 'y', 'az', 'ac'],
    'backpw': ['b', 'h', 'r', 'w', 'x', 'y', 'az'],
    'updatepw': [],
    'bindingMobile': [],
    'realname': [],
    'edit': [],
    'sign': [],
    'info': [],
    'checkUsertoken': [],
    'consumption': [],
    'syfpay': [],
    'syfpay_ptb': [],
    'ptbpay': [],
    'alipay': [],
    'alipay_ptb': [],
    'pay': [],
    'payRecord': [],
    'character': [],
    'gift': [],
    'getgift': []
  }
  // 参数 校验表
  static paramsTypes = {
    // 密文名 : [ 明文名 , 类型 , 取值范围(可选) , 默认值|取值函数 ]
    'a': ['app_id', 'int', { max: 100, min: 1 }],
    'b': ['username', 'string', { max: 100, min: 8 }, ''],
    'c': ['imel', 'string', { max: 100, min: 6 }, 'default'],
    'd': ['from', 'int', { max: 100, min: 6 }, 'H5'],
    'e': ['agentgame', 'string', { max: 100, min: 6 }, 'default'],
    'f': ['deviceinfo', 'string', { max: 100, min: 6 }, 'default'],
    'g': ['userua', 'string', { max: 100, min: 6 }, 'default'],
    'h': ['password', 'string', { max: 100, min: 6 }, 'default'],
    'i': ['server', 'string', { max: 100, min: 6 }, 'default'],
    'j': ['payway', 'string', { max: 100, min: 6 }, 'default'],
    'k': ['productname', 'string', { max: 100, min: 6 }, 'default'],
    'l': ['productdesc', 'string', { max: 100, min: 6 }, 'default'],
    'm': ['attach', 'string', { max: 100, min: 6 }, 'default'],
    'n': ['num', 'int', { max: 50000, min: 1 }, 100],
    'o': ['amount', 'float', { max: 100, min: 6 }, 'default'],
    'p': ['role', 'string', { max: 100, min: 6 }, 'default'],
    'q': ['issend', 'int', { max: 100, min: 6 }, 'default'],
    'r': ['issend', 'string', { max: 100, min: 6 }, 'default'],
    's': ['userphone', 'string', { max: 100, min: 6 }, 'default'],
    't': ['paystatus', 'int', { max: 100, min: 1 }, 1],
    'u': ['page', 'int', { max: 100, min: 6 }, 'default'],
    'v': ['mem_id', 'int', { max: 100, min: 6 }, 'default'],
    'w': ['code', 'int', { max: 100, min: 6 }, 0],
    'x': ['client_id', 'int', { max: 100, min: 1 }, 'default'],
    'y': ['api_token', 'string', { max: 100, min: 6 }, 'default'],
    'z': ['user_token', 'string', { max: 100, min: 6 }, 'default'],
    'az': ['param_token', 'string', { max: 100, min: 6 }, 'default'],
    'ab': ['version', 'string', { max: 100, min: 6 }, 'default'],
    'ac': ['ipaddrid', 'string', { max: 100, min: 6 }, 'default'],
    'ad': ['productid', 'string', { max: 100, min: 6 }, 'default'],
    'ae': ['userfrom', 'int', { max: 100, min: 6 }, 'default'],
    'af': ['nickname', 'string', { max: 100, min: 6 }, 'default'],
    'ag': ['head_img', 'string', { max: 100, min: 6 }, 'default'],
    'ah': ['expries_date', 'string', { max: 100, min: 6 }, 'default'],
    'ai': ['pay_token', 'string', { max: 100, min: 6 }, 'default'],
    'aj': ['tradeid', 'string', { max: 100, min: 6 }, 'default'],
    'ak': ['ordered', 'string', { max: 100, min: 6 }, 'default'],
    'al': ['appverifystr', 'string', { max: 100, min: 6 }, 'default'],
    'am': ['newpassword', 'string', { max: 100, min: 6 }, 'default'],
    'an': ['sdkversion', 'string', { max: 100, min: 6 }, 'default'],
    'ao': ['role_id', 'string', { max: 100, min: 6 }, 'default'],
    'ap': ['server_id', 'string', { max: 100, min: 6 }, 'default'],
    'aq': ['ptbpay_token', 'string', { max: 100, min: 6 }, 'default'],
    'ar': ['portrait', 'string', { max: 100, min: 6 }, 'default']
  }

  static initApiParams (api) {
    if (lodash.isNil(api) || !lodash.isString(api)) {
      return null
    }
    let params = {}
    for (let key in self.apiParamsTable) {
      if (key === api) {
        let data = self.apiParamsTable[key]
        for (let i = 0, len = data.length; i < len; i++) {
          params[data[i]] = self.initParamsValue(data[i])
        }
      }
    }
    return params
  }

  static initParamsValue (key) {
    return key
  }

  static checkParams (key, value) {
    return true
  }
}

export {
  Types
}
