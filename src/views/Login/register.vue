<template>
  <div class="registerbox">
    <span class="goback fl" @click="goback()"></span>
    <span class="pageTitle">账号注册</span>
    <el-form ref="RegisterForm" :model="RegisterForm" class="container clearfix" :rules="rules">
      <el-form-item>
        <div class="textbox">已经为您预分配游戏账号，您可以重新设置。<b class="warningtext">游戏账号是唯一的凭证，设置成功后不可更改。</b></div>
      </el-form-item>
      <el-form-item prop="username" class="form-item" >
        <el-input v-model="RegisterForm.username" placeholder="请输入您要注册的账号" ></el-input>
      </el-form-item>
      <el-form-item prop="password" class="form-item">
        <el-input v-model="RegisterForm.password" type="password" placeholder="请输入6-16位密码，区分大小写"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" class="register-btn" v-tap="{methods:register,param:'RegisterForm'}" :disabled='disabled' >注册</el-button>
        <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask :text="toastText" position="middle"></toast>
      </el-form-item>
      <el-form-item class="protocolcheck">
        <span @click='text'>
          <span class="img2" v-if='radio'></span>
          <span class="img" v-else></span>
          <span class="text">&nbsp;同意&nbsp;</span>
        </span>
        <span class="protocol" v-tap="{methods:showModule}">《16用户协议》</span>
        <span class="goLogin" v-tap='{methods:goLogin}'>已有账号，登录</span>
      </el-form-item>
    </el-form>
    <div>
      <loading v-model='show1' :text="text1"></loading>
    </div>
  </div>
</template>

<script>
import { Signin, RegisterNew } from '@/api'
import { AlertModule, Loading } from 'vux'

export default {
  data () {
    var validateUsername = (rule, value, callback) => {
      var pwd = this.RegisterForm.password
      var reg = /^[a-zA-Z0-9]{6,16}$/
      var reg2 = /[\u4E00-\u9FA5]/
      if (reg.test(value) && !reg2.test(value)) {
        if (reg.test(pwd) && this.check) {
          this.disabled = false
        }
        callback()
      }
      if (reg2.test(value)) {
        return callback(new Error('不能有中文'))
      }
      if (!reg.test(value)) {
        return callback(new Error('长度在6到16位'))
      }
    }
    var validatePass = (rule, value, callback) => {
      var name = this.RegisterForm.username
      var reg = /^[a-zA-Z0-9]{6,16}$/
      var reg2 = /[\u4E00-\u9FA5]/
      if (reg.test(value) && !reg2.test(value)) {
        if (reg.test(name) && this.check) {
          this.disabled = false
        }
        callback()
      }
      if (reg2.test(value)) {
        this.disabled = true
        return callback(new Error('不能有中文'))
      }
      if (!reg.test(value)) {
        this.disabled = true
        return callback(new Error('长度在6到16位'))
      }
    }
    return {
      RegisterForm: {
        username: '',
        password: '',
        protocol: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      radio: true,
      disabled: true,
      check: false,
      showPositionValue: false,
      toastText: '',
      show1:false,
      text1:'请稍等'
    }
  },
  components:{
    Loading
  },
  created () {
    Signin().then(res => (this.RegisterForm.username = res.data.a))
  },
  methods: {
    register (params) {
      var self = this
      var name = this.RegisterForm.username
      var pwd = this.RegisterForm.password
      this.show1 = true
      RegisterNew(name, pwd).then(res => {
        this.showPositionValue = true
        this.show1 = false
        this.toastText = res.msg
        if(res.code === 1 ){
          setTimeout(function(){
            self.$router.push({path:'/login'})
          },2000)
        }
      })
    },
    goLogin () {
      this.$router.push({ name: 'Login' })
    },
    showModule () {
      var self = this
      AlertModule.show({
        title: '',
        content: '<iframe src="http://sdk.4cgame.com/api/agreement.html" id="agreement"></iframe>',
        onShow () {

        },
        onHide () {
          self.radio = false
          self.disabled = false
        }
      })
    },
    goback () {
      this.$router.go(-1)
    },
    text () {
      var name = this.RegisterForm.username
      var pwd = this.RegisterForm.password
      var reg = /^[a-zA-Z0-9]{6,16}$/
      var reg2 = /[\u4E00-\u9FA5]/
      if (this.radio) {
        this.check = true
        this.radio = false
        if (reg.test(name) && !reg2.test(name) && reg.test(pwd)) {
          this.disabled = false
        }
      } else {
        this.check = false
        this.radio = true
        this.disabled = true
      }
    }
  }
}
</script>

<style lang="scss">
#agreement{
  width: 100%;
  height: 100%;
  border:0;
}
.weui-dialog__hd{
    padding:5px 0;
}
.weui-dialog__bd>div{
  height:4rem;
  overflow: auto;
}
.registerbox {
  font-size: 0.12rem;
  position: absolute;
  width: 3.1rem;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.06rem;
  box-sizing: border-box;
  .container {
    padding: 0 0.15rem;
  }

  // 返回按钮
  .goback {
    margin: .2rem 0 .2rem .16rem;
    display: inline-block;
    width: 0.17rem;
    height: 0.29rem;
    background: url(/static/sdk_sprite.png) -0.2rem 2.02rem;
    background-size: 2rem;
  }
  .pageTitle {
    position: absolute;
    top: .18rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
  }
  .el-form-item {
    margin-bottom: 0px;
    .textbox {
      background-color: #f1f9fc;
      font-size: 12px;
      text-align: left;
      line-height: .2rem;
      padding: 5px 5px 5px 10px;
      margin-bottom: .1rem;
      .warningtext {
        color: red;
        font-weight: 600;
      }
    }
    .register-btn {
      width: 100%;
    }
  }
  .form-item {
    margin-bottom: .18rem;
  }
  .protocolcheck {
    margin-bottom: 0px;
    width: 100%;
    text-align: left;
    span {
      font-size: 12px;
      margin-bottom: 0px;
    }
    label {
      margin-bottom: 0px;
    }
    .protocol {
      color: #5f8fff;
      cursor: pointer;
    }
    .goLogin {
      float: right;
    }
    .img2{
      width: 0.12rem;
      height: 0.12rem;
      border: 0.01rem solid #aaa;
      border-radius: 50%;
      background: white;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }
    .img{
      display: inline-block;
      width: 0.17rem;
      height:0.18rem;
      position:absolute;
      top: 50%;
      transform: translateY(-50%);
      background:url('/static/sdk_sprite.png') 0rem 2.45rem;
      background-size: 2.27rem;
    }
    .text{
        margin-left:0.18rem;
      }
  }
}
</style>
