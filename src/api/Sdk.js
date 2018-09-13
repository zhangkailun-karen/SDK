import { Encrypt } from './Encrypt'
import lodash from 'lodash'
import http from 'axios'
import { Types } from './Types'

class Sdk {
  $http = null
  $encrypt = null
  static $instance
  constructor ($http, $encrypt) {
    this.$http = $http
    this.$encrypt = $encrypt
  }

  static Instance () {
    if (lodash.isNil(Sdk.$instance)) {
      Sdk.$instance = new Sdk(http, Encrypt.Instance())
    }
    return Sdk.$instance
  }


  init ($data) {
    let params = Types.initApiParams('init')
    for (let key in $data) {
      if ($data.hasOwnProperty(key)) {
        let err = Types.checkParams(key, $data[key])
        if (!err) {
          throw new Error('type error ' + key)
        }
      }
    }
  }

  login ($data) {

  }
  checkToken ($data) {

  }
}

function Init ($data) {
  sdk.Instance().init()
}

export {
  Sdk
}
