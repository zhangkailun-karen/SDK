import md5 from 'md5'
import lodash from 'lodash'
import { Time } from './Time'

class Encrypt {
  static _$md5
  static $install

  constructor () {
    this._$md5 = md5
  }

  static Instance () {
    if (lodash.isNil(self.$install)) {
      Encrypt.$install = new Encrypt()
    }
    return Encrypt.$install
  }

  static sign (data, keyArr) {
    if (!lodash.isObject(data) && lodash.isNil(data)) {
      return false
    }
    let str = ''
    if (lodash.isNil(keyArr) || lodash.isEmpty(keyArr) || !lodash.isArray(keyArr)) {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          let d = key + '=' + data[key]
          str = lodash.isEmpty(str) ? d : str + '&' + d
        }
      }
      return Encrypt.encode(str)
    }

    for (let i = 0, len = keyArr.length; i < len; i++) {
      if (data.hasOwnProperty(keyArr[i])) {
        let d = keyArr[i] + '=' + data[keyArr[i]]
        str = lodash.isEmpty(str) ? d : str + '&' + d
      }
    }
    return Encrypt.encode(str)
  }

  static encode (data) {
    if (lodash.isString(data) && !lodash.isNil(data)) {
      return Encrypt.Instance()._$md5(data)
    }
    return ''
  }

  static apiToken (api, code, clientKey) {
    if (lodash.isNil(api) || lodash.isNil(clientKey)) {
      return false
    }
    let date = Time.date('Y-m-d')
    return Encrypt.encode(api + date + code + clientKey)
  }
}

export { Encrypt }
