<template>
  <div class="LoginBox" v-if="type">
    <el-form ref="loginFormref" :model="LoginForm" class="container">
      <el-form-item class="form-item-logo">
        <div class="Logo">
          <img src="../../assets/img/4C-logo.png" alt="">
        </div>
      </el-form-item>
      <el-form-item class="form-item">
        <el-input v-model="LoginForm.username" placeholder="请输入账号/手机号" @blur="nameVerify()"></el-input>
      </el-form-item>
      <el-form-item class="form-item">
        <el-input v-model="LoginForm.password" type="password" placeholder="请输入密码" @blur="pwdVerify()"></el-input>
      </el-form-item>
      <el-form-item class="auto-forget">
        <el-checkbox v-model="LoginForm.autologin" class="fl" label="自动登录" checked></el-checkbox>
        <span class="pwdForget fr" v-tap="{ methods:checkedChange }">忘记密码?</span>
      </el-form-item>
      <el-form-item>
        <x-button v-tap="{ methods:login, param:'loginFormref'}" type="primary" :gradients="['#ff9800', '#ff9800']">登录</x-button>
        <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="toastText" width="150px" :position="position"></toast>
      </el-form-item>
      <el-form-item class="register">
        <span v-tap="{ methods:register }">快速注册</span>|<span v-tap="{ methods:registerphone }">手机注册</span>
      </el-form-item>
    </el-form>
  </div>
  <div v-else>
    <p style="text-align:center;margin-top:1rem">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">初始化中...&nbsp;&nbsp;</span>
      <inline-loading></inline-loading>
    </p>
  </div>

</template>

<script>
import {Login, Init, Setlocal, Getlocal} from '@/api'
import { setTimeout } from 'timers'
import { InlineLoading } from 'vux'
import $ from 'jquery'

export default {

  data () {
    return {
      showPositionValue: false, // 是否显示提示
      position: 'center', // 提示信息的位置
      toastText: '',
      LoginForm: {
        username: '',
        password: '',
        autologin: ''
      },
      type:false
    }
  },
  components: {
    InlineLoading
  },
  created () {
    var self = this
    Init().then(res => {
      if (res.code === 1) {
        self.type = true
      }
      var SDKDATA = Getlocal('4CSDK-Init')
      SDKDATA = {
        ...res.data
      }
      Setlocal('4CSDK-Init',SDKDATA)
      SDKDATA = Getlocal('4CSDK-Login')
      if (SDKDATA.autoLogin == 'true') {
        if (SDKDATA.a && SDKDATA.b) {
          self.$router.push({path: '/logining'})
        }
      }
    })
    function showPosition (position) {
      this.position = position
      this.showPositionValue = true
    }
  },
  methods: {
    nameVerify () {
      var reg = /^[a-zA-Z0-9]{6,16}$/
      var name = this.LoginForm.username
      if (!reg.test(name)) {
        this.toastText = '用户名格式错误'
        this.showPositionValue = true
      }
    },
    pwdVerify () {
      var reg = /^[a-zA-Z0-9]{6,16}$/
      // var pwd = this.LoginForm.password
      if (!reg.test(this.LoginForm.password)) {
        this.toastText = '密码格式错误'
        this.showPositionValue = true
      }
    },
    login (formName) {
      let then = this
      var reg = /^[a-zA-Z0-9]{6,16}$/
      var name = this.LoginForm.username
      var pwd = this.LoginForm.password
      if(!reg.test(name)){
        this.toastText = '用户名格式错误'
        this.showPositionValue = true
        return
      }
      if(!reg.test(this.LoginForm.password)){
        this.toastText = '密码格式错误'
        this.showPositionValue = true
        return
      }
      if (then.LoginForm.username === '') {
        this.toastText = '用户名为空'
        this.showPositionValue = true
        return
      }
      if (then.LoginForm.password === '') {
        this.toastText = '密码为空'
        this.showPositionValue = true
        return
      }
      Login(this.LoginForm).then(res => {
        var SDKDATA = Getlocal('4CSDK-Login')
        if (res.code === 1) {
          this.toastText = '登录成功'
          this.showPositionValue = true
          // 储存返回数据
          SDKDATA = {
            ...res.data
          }
          SDKDATA.autoLogin = then.LoginForm.autologin
          // SDKDATA.userID = res.data.a
          // SDKDATA.userToken = res.data.b
          // SDKDATA.phone = res.data.c
          // SDKDATA.name = res.data.n
          // SDKDATA.money = res.data.e
          // SDKDATA.age = res.data.d
          // SDKDATA.userImg = res.data.ar
          SDKDATA.time = fun_date(1)
          function fun_date (aa) {
            var date1 = new Date(),
              time1 = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate()// time1表示当前时间
            var date2 = new Date(date1)
            date2.setDate(date1.getDate() + aa)
            var time2 = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate()
            var time3 = Date.parse(time2) / 1000
            return time3
          }
          Setlocal('4CSDK-Login',SDKDATA)
          setTimeout(function(){
            then.$router.push({path: '/logining'})
          },1000)
        } else {
          this.toastText = res.msg
          this.showPositionValue = true
        }
      }).catch(err => {
        this.toastText = err.msg
        this.showPositionValue = true
      })
    },
    register () {
      this.$router.push({name: 'register'})
    },
    checkedChange () {
      this.$router.push({name: 'retrievePwd'})
    },
    registerphone () {
      this.$router.push({name: 'registerphone'})
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss">
  .LoginBox{
    position: absolute;
    width:3.1rem;
    background-color: #fff;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    border-radius:0.06rem;
    .container{
      padding:0 0.15rem;
    }
    .el-form-item__content{
      text-align: center;
      line-height: 0.4rem;
    }
    .el-form-item{
      margin-bottom:0;
    }
    .Logo{
      width: 1.2rem;
      margin:.2rem auto 0;
    }
    .Logo img{
      width:100%;
    }
    .form-item{
      margin:.15rem auto 0;
    }
    .form-item input{
     height: .42rem;
    }
    .auto-forget{
      padding:0 10px;
    }
    .el-checkbox{
      margin:.05rem 0px 0px;
      color:#ccc;
      // line-height:40px;
    }
    .pwdForget{
      font-size:14px;
      margin:.05rem 0px 0px;
      cursor:pointer;
      display:inline-block;
      // line-height:40px;
    }
    .login-btn{
      margin:5px 0px;
      width: 100%;
    }
    .weui-btn{
      font-size: .18rem;
    }
    .register{
      span{
        padding:.1rem 0.2rem;
        cursor:pointer;
      }
    }
  }
</style>
