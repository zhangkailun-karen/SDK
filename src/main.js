// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/styles/common.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/styles/media.css?=1'
import firstdemo from './components/ball'
import vuxb from './components/pub_vux'
import vueTap from 'v-tap'
import axios from 'axios'
import { Init, Logout } from '@/api'
import $ from 'jquery'
import { Pay, Alipay, Syfpay, Ptbpay, Getlocal, Setlocal , sign} from '@/api'

Vue.use(ElementUI)
Vue.use(router)
Vue.use(firstdemo)
Vue.use(vueTap)
Vue.use(axios)
Vue.use(vuxb)
Vue.prototype.SDKinit = function (data) {
  Init(data).then(res => {
    if (res.code === 1) {
      $('#app').css('display', 'block')
    }
    Setlocal('4CSDK-Init', res.data)
    // alert(res.msg)
  }).catch(err => {
    var initerr = {
      code: err.code,
      msg: err.msg
    }
    window.eventBus.$emit('initover', initerr)
  })
}
Vue.prototype.SDKpayinit = function (data) {
  localStorage.payData = JSON.stringify(data)
  this.$router.push({path: '/gamepay'})
}
Vue.prototype.hideBall = function (data) {
  $('#ball').css('display', 'none')
}
Vue.prototype.showBall = function (data) {
  $('#ball').css('display', 'block')
}

Vue.prototype.SDKloginout = function () {
  if (localStorage.userToken) {
    Logout().then(res => {
      var logoutres = {
        code: res.code,
        msg: res.msg
      }
      window.eventBus.$emit('islogout', logoutres) // 发送事件
      if (res.code === 1) {
        localStorage.clear()
        setTimeout(() => { this.$router.push({name: 'login'}) }, 1000)
      }
    })
  }
}
Vue.config.productionTip = false

/* eslint-disable no-new */
window.eventBus = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
var time = 1
// 在这里添加路由守卫
router.beforeEach((to, from, next) => {
  //判断token
  if(localStorage.getItem('4CSDK-Login')){
    var code = null
    if(time == 1){
        time = 2
        var timer = setTimeout(function(){
        sign().then(res=>{
          code = res.code;
          if(code != 1){
            localStorage.clear()
            next({path : '/login'})
          }
        })
        time = 1
      },3600000)
    }
  }
  //路由判断
  if (to.path == '/login') {
    if(localStorage.getItem('4CSDK-Login')){
      next({path:'/logining'})
      return
    }
  }else if(from.path == '/login' || from.path == '/register' || from.path == '/registerphone' || from.path == '/retrievePwd'){
    if(to.path == '/register' || to.path == '/registerphone' || to.path == '/retrievePwd'){
      next();
      return
    }
    if(localStorage.getItem('4CSDK-Login')){
      next();
    }else{
      next({path : '/login'})
      return
    }
  }
  next();
})

