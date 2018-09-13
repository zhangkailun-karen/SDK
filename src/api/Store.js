import lodash from 'lodash'
import localforage from 'localforage'
import Cookie from 'js-cookie'

// 暂时不支持 sessionStorage v2 开始支持
const WAYS = [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE, 'cookie', 'sessionStorage']
const DEF = 'cookie'
const DB_NAME = '4CGAME_SDK_DB'
const description = 'data store for sdk,version 1.0.0,date:1529993571008,author:weblinuxgame'
const storeName = 'db_h5_sdk'

/**
 * 存储工具类
 */
class Store {
      way
      handler
      val
    static INDEXEDDB = localforage.INDEXEDDB
    static WEBSQL = localforage.WEBSQL
    static LOCALSTORAGE = localforage.LOCALSTORAGE
    static COOKIE = 'Cookie'
    static SESSIONSTORAGE = 'SessionStorage'
    static $self
    constructor (way) {
      if (lodash.isNil(way) || !WAYS.includes(way)) {
        way = DEF
      }
      this.way = way
      if (DEF === this.way) {
        this.handler = Cookie
      } else {
        localforage.config({
          driver: lodash.uniq([
            this.way,
            Store.WEBSQL,
            Store.INDEXEDDB,
            Store.LOCALSTORAGE
          ]),
          name: DB_NAME,
          storeName,
          description
        })
        this.handler = localforage
      }
    }

    /**
     * 存储
     * @param {string} key
     * @param {any} val [object,string,number]
     * @param {int} expire
     */
    set (key, val, expire = -1) {
      if (lodash.isNil(key)) {
        console.warn('store params key is empty')
        return this
      }
      if (lodash.isUndefined(val)) {
        console.error('store params val is undefined')
        return this
      }
      if (DEF === this.way) {
        return this.handler.set(key, val, {expire})
      }
      this.handler.setItem(key, {val, expire})
      return this
    }

    /**
     * 获取 本地存储
     * @param {*} key
     * @returns any|Prommise
     */
    get (key) {
      if (DEF === this.way) {
        this.val = this.handler.get(key)
        return this.val
      }
      let t = localforage.getItem(key)
      if (Store.isPromise(t)) {
        t.then(data => {
          this.val = data
          if (this.isExpire(data)) {
            return undefined
          }
          return this.getVal(data)
        })
          .catch(err => { console.error(err); return err })
      }
      return t
    }

    /**
     * 判断 对象是否为 Promise
     * @param {*} val
     * @returns {boolean}
     */
    static isPromise (val) {
      return Object.prototype.toString.call(val) === '[object Promise]'
    }

    /**
     * 获取 存储数据内容
     * @param {*} data
     * @returns {string|object|number|undefined}
     */
    getVal (data) {
      if (lodash.isObject(data) && data.hasOwnProperty('val') && !lodash.isNil(data.val)) {
        return data.val
      }
      return undefined
    }

    /**
     * 存储 是否过期
     * @param {*} expire
     * @returns {boolean}
     */
    isExpire (expire) {
      if (lodash.isObject(expire) && expire.hasOwnProperty('expire')) {
        expire = expire.expire
      }
      if (!lodash.isNumber(expire)) {
        return false
      }
      expire = parseInt(expire)
      if (expire === 0) {
        return false
      }
      if (expire < 0 || expire < Date.now()) {
        return true
      }
      return false
    }

    /**
     * 获取 cookie 存储对象
     */
    static Instance () {
      if (lodash.isNil(Store.$self)) {
        Store.$self = new Store(Store.COOKIE)
      }
      return Store.$self
    }
}

export { Store }
