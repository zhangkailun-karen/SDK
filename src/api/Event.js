import $ from 'jquery'
import lodash from 'lodash'

const DEBUG_ID = '4cgame_sdk_debug'

class Event {
      $dom = $
      $debug
      debugBtn
      qlist
     static EVENT_ONES = 1
     static EVENT_USE = 3
     static EVENT_INTERVAL = 2

     constructor (config = {}) {
       this.qlist = {
         'ones': {},
         'use': {
           'emit-event': [
             (args) => console.log(args)
           ],
           'emit-handler-error': [
             (args) => console.error(args)
           ]

         },
         'stop': []
       }
       if (lodash.isEmpty(config)) {
         this.debugBtn = true
         this.$dom('body').appendTo('<div id=' + DEBUG_ID + " style='display:none'></div>")
         this.$debug = this.$dom('#' + DEBUG_ID)
       }

       if (lodash.isObject(config)) {
         this.debugBtn = config.hasOwnProperty('debugBtn') ? config.debugBtn : false
         this.$debug = config.hasOwnProperty('$debug') ? this.$dom(config.$debug) : null
       }
     }

     /**
      * 添加 事件
      * @param {*} key
      * @param {*} handler
      */
     add (key, handler) {
       if (lodash.isNil(key) || !lodash.isString(key)) {
         return false
       }
       if (lodash.isFunction(handler)) {
         this.qlist.use[key] = lodash.isNil(this.qlist.use[key]) || lodash.isEmpty(this.qlist.use[key]) ? [] : this.qlist.use[key]
         this.qlist.use[key].push(handler)
       }
       return false
     }

     /**
      * 发送 事件
      * @param {*} key
      * @param {*} args
      * @param {*} debug
      */
     emit (key, args, debug = false) {
       if (debug === true) {
         // 发送事件记录
         this.emit('emit-event', {key, args, time: Date.now()}, false)
       }
       let user = this.qlist.use
       let one = this.qlist.ones
       let that = this
       let stack = 1
       let lastStack = null
       let isOnes = false
       let li = null
       if (user.hasOwnProperty(key)) {
         li = user
       }
       if (lodash.isNil(li) && one.hasOwnProperty(key)) {
         li = one
         isOnes = true
       }

       if (lodash.isNil(li)) {
         this.emit('emit-handler-error', {msg: key + ' event not exitst ', event: key})
         return false
       }
       li[key].forEach(element => {
         try {
           if (lodash.isFunction(element)) {
             lastStack = element({args, event: key, scope: that, lastStack, index: stack})
           }
           stack = stack + 1
         } catch (e) {
           // 异常捕获
           that.emit('emit-handler-error', {handlerArgs: element, event: key, stack})
         }
         if (stack === li[key].length && isOnes) {
           delete that.qlist.ones[key]
         }
       })
     }

     /**
      * 手动触发
      * @param {*} key
      * @param {*} args
      * @param {*} debug
      */
     trigger (key, args, debug = false) {
       return this.emit(key, args, debug)
     }

     /**
      * 只执行一次事件
      * @param {*} key
      * @param {*} handler
      */
     ones (key, handler) {
       if (lodash.isNil(key) || !lodash.isFunction(handler)) {
         return false
       }
       if (!this.qlist.ones.hasOwnProperty(key)) {
         this.qlist.ones[key] = []
       }
       this.qlist.ones[key] = this.qlist.ones[key].push(handler)
     }

     /**
      * 移除 事件
      * @param {*} key
      * @param {*} type
      */
     remove (key, type = Event.EVENT_USE) {
       let li
       if (Event.EVENT_USE === type) {
         li = this.qlist.use
       }
       if (Event.EVENT_ONES === type) {
         li = this.qlist.ones
       }
       if (!lodash.isNil(li)) {
         if (li.hasOwnProperty(key)) {
           delete li[key]
         }
       }
     }

     /**
      *销毁对象
      */
     destroy () {
       delete this.qlist.use
       delete this.qlist.ones
     }
}

const EventInstance = new Event()

export default EventInstance
