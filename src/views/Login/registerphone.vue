<template>
  <div class="registerphonebox">
    <span class="goback fl" v-tap="{methods:goback}"></span>
    <span class="pageTitle">手机号注册</span>
    <el-form ref="RegisterphoneForm" :model="RegisterphoneForm" class="container clearfix">
      <el-form-item class="form-item">
        <el-input v-model="RegisterphoneForm.phone" placeholder="请输入账号或手机"></el-input>
      </el-form-item>
      <el-form-item class="form-item">
        <el-input v-model="RegisterphoneForm.password" type="password" placeholder="请输入6-16位密码，区分大小写"></el-input>
      </el-form-item>
       <el-form-item class="form-item verify">
        <el-input v-model="RegisterphoneForm.verification" placeholder="请输入验证码"></el-input>
        <el-button type="success" class="verifybtn fr" v-tap="{methods:send,param:RegisterphoneForm}">
          <p class="text">获取验证码</p>
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" class="register-btn" v-tap="{methods:register,param:RegisterphoneForm}" :disabled="type">注册</el-button>
      </el-form-item>
     <group>
        <toast v-model="showPositionValue" type="text" :time="1000" :text="toastText" position="middle"></toast>
      </group>
    </el-form>
    <div>
      <loading v-model='show1' :text="text1"></loading>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { Note, Mobilesignin } from '@/api'
import { AlertModule, Loading } from 'vux'

export default {
  data () {
    return {
      RegisterphoneForm: {
        phone: '',
        password: '',
        verification: ''
      },
      showPositionValue: false,
      toastText: '',
      show1:false,
      text1:'请稍等',
      type:false
    }
  },
  components:{
    Loading
  },
  methods: {
    show(msg){
      this.toastText = msg
      this.showPositionValue = true
    },
    send (params) {
      var phone = this.RegisterphoneForm.phone
      var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if(!reg.test(phone)){
        this.show('手机号格式错误')
        return
      }
      Note(phone).then(res => {
        if (res.code === 1) {
          let countdown = 60
          function settime() {
            if (countdown == 0) {
              $('.verifybtn')[0].removeAttribute('disabled')
              $('.text')[0].innerText = '免费获取验证码'
              $('.verifybtn')[0].css('background', '#ccc')
              countdown = 60
            } else {
              $('.verifybtn')[0].setAttribute('disabled', true)
              $('.text')[0].innerText = '重新发送(' + countdown + ')'
              countdown--
              setTimeout(function () {
                settime()
              }, 1000)
            }
          }
          settime()
        } else {
          this.show(res.msg)
        }
      })
    },
    register (formName) {
      var phone = this.RegisterphoneForm.phone
      var pwd = this.RegisterphoneForm.password
      var code = this.RegisterphoneForm.verification
      var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      var reg2 = /^[a-zA-Z0-9]{6,16}$/
      if(!reg.test(phone)){
        this.show('手机号格式错误')
        return
      }
      if(pwd === ''){
        this.show('密码为空')
        return
      }
      if(!reg2.test(pwd)){
        this.show('密码格式错误')
        return
      }
      if(code === ''){
        this.show('请输入验证码')
        return
      }
      let data = {
        phone: phone,
        password: pwd,
        verification: this.RegisterphoneForm.verification
      }
      this.show1 = true
      Mobilesignin(data).then(res => {
        var self = this
        this.type = true
        if(res.code === 1){
          this.show1 = false
          setTimeout(function(){
            self.$router.push({path:'/login'})
          })
        }else{
          this.show1 = false
        }
        this.show(res.msg)
        setTimeout(function(){
          self.type = false
        },2000)
      })
    },
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
// 盒子
  .registerphonebox {
    font-size: 0.12rem;
    position: absolute;
    width:3.1rem;
    background-color: #fff;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    border-radius:0.06rem;
    padding: .06rem 0;
    box-sizing:border-box;
    .container{
      padding:0 0.15rem;
    }
    // 返回按钮
    .goback{
    margin: .18rem 0 .2rem .16rem;
    display: inline-block;
    width: 0.18rem;
    height: 0.29rem;
    background: url(/static/sdk_sprite.png) -0.2rem 2.02rem;
    background-size: 2rem;
    }
    // 页面标题
    .pageTitle{
      position: absolute;
      top:.25rem;
      left:50%;
      transform:translateX(-50%);
      font-size:18px;
    }

    .el-form-item{
      margin-bottom: 0;
      // 注册按钮
      .register-btn{
        width:100%;
      }
    }
    //验证码模块
    .verify{
      padding-right:110px;
      position: relative;
      //获取验证码按钮
      .verifybtn{
        padding:0px;
        width:112px;
        position: absolute;
        top:0px;
        right:-110px;
        border-radius:1px 5px 5px 1px;
        box-sizing:border-box;
        line-height:38px;
        p{
          margin:0 auto;
        }
      }
    }
    .form-item{
      margin-bottom:.15rem;
    }
  }
</style>
