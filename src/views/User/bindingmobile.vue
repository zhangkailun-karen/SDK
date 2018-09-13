<template>
  <div class="bindingmobile">

    <div class="bindingmobile_header">
      <x-header :left-options="{backText: ''}" @on-click-back="back" right-options.showMore="true" header-title-color='#ccc'>绑定手机号</x-header>

    </div>
    <div class="bindingmobile_main">
      <el-form ref="bindingmobileForm" :model="bindingmobileForm">
        <p>暂时只支持中国大陆手机号</p>
        <group>
          <x-input v-model="phoneNum" title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
        </group>
        <el-form-item prop="verify" class="form-item verify">
          <el-input v-model="RegisterphoneForm.verification" placeholder="请输入验证码"></el-input>
          <!-- <el-button type="success" class="verifybtn fr">
            <p class="text" v-model='smscode' @click="send('RegisterphoneForm')">获取验证码</p> -->
            <el-button  type="success" class="verifybtn fr" v-tap="{methods:send,param:RegisterphoneForm}">
          <p class="text">获取验证码</p>
          </el-button>
        </el-form-item>
          <el-button type="warning" class="register-btn" @click="register('RegisterphoneForm')">绑定手机</el-button>
      </el-form>
    </div>
      <group>
        <toast v-model="showPositionValue" type="text" :time="1000" :text="toastText" position="middle"></toast>
      </group>
      <div>
        <loading v-model='show1' :text="text1"></loading>
      </div>
  </div>
</template>

<script>
import { XHeader, XButton, XInput, Group, Toast,Loading} from 'vux'
import { Note, Bindingmobile } from '@/api'
import { log } from 'util';
import $ from 'jquery'
export default {
  components: {
    XInput,
    XHeader,
    XButton,
    Group,
    Toast,
    Loading
  },
  data () {
    return {
      RegisterphoneForm: {
        verification: '',
      },
      toastText: '',
      showPositionValue: false,
      phoneNum:'',
      smscode:'',
      bindingmobileForm:{},
      show1:false,
      text1:'请稍等'
    }
  },
  methods: {
    back () {
      this.$router.push({ path: '/user' })
    },
    // 获取验证码
    send () {
      var s = this.phoneNum
      var type = 3
      Note(s,type).then(res => {
       this.toastText = res.msg
       this.showPositionValue = true
       if (res.code === 1 ) {
           let countdown = 60
            settime()
          //验证码定时器
          function settime () {
            if (countdown == 0) {
              $('.verifybtn')[0].removeAttribute('disabled')
              $('.text')[0].innerText = '免费获取验证码'
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
       }
      })
    },
    // 绑定手机号
    register(){
      var p = this.phoneNum
      var s = this.RegisterphoneForm.verification
      this.show1 = true
      Bindingmobile(p,s).then(res => {
        this.show1 = false
        this.toastText = res.msg
       this.showPositionValue = true

      })

    }
  }
}
</script>

<style lang="scss">
.bindingmobile {
  background: #fff;
  font-size: 0.12rem;
  height: 100%;
  overflow-y: auto;
}
// 头部
.bindingmobile_header {
  border-bottom: 1px solid #efefef;
  width: 90%;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 9;
  .vux-header {
    padding: 9px 0;
    background: #efefef;
    .vux-header-title {
      color: #333 !important;
    }
    .vux-header-left {
      position: static;
      .left-arrow {
        left: 0.2rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .head_title {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .head_arrow {
    width: 13px;
    height: 24px;
    top: 50%;
    background: url(/static/img/sdk_sprite.9b72061.png) -30px -70px;
    transform: translateY(-50%);
    margin-left: 0.19rem;
  }
}
// 中间部分
.bindingmobile_main {
  margin: 0.58rem 0 0.64rem;
  padding: 0.23rem;
  overflow: auto;

  p,
  input {
    font-size: 0.12rem;
    float: left;
    margin-bottom: 0.13rem;
  }
  p:nth-child(2) {
    color: #999;
  }
  .el-form-item {
    margin-bottom: 0;
    width: 100%;
  }
  margin: 0.6rem 0 0.64rem;
  padding: 0.25rem 0.2rem;
  .el-button--warning{
     background-color: #ffad06;
  }
  .weui-btn_primary {
    background-color: #ffad06;
    font-size: 0.14rem;
    padding: 0.03rem 0;
    &:active {
      background-color: #ecb100;
    }
  }
  .weui-cells{

    width: 100%;
  }
  .weui-cell {
    margin-bottom: 0.2rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 0.12rem;
    padding: .04rem .08rem;
    &:before {
      border-top: none;
    }
  }
  .weui-cell__bd {
    .weui-label {
      text-align: left;
    }

    .weui-input {
      line-height: .1rem;
      margin: .07rem .07rem;
    }
  }
}

//验证码模块
.verify {
  // position: relative;
  float: left;
  .sub {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    background: #ffad06;
  }
  //获取验证码按钮
  .verifybtn {
    padding: 0px;
    width: 112px;
    position: absolute;
    top: 0px;
    right: 0;
    border-radius: 1px 5px 5px 1px;
    box-sizing: border-box;
    line-height: 38px;
    p {
      margin: 0 auto;
      width: 100%;
      text-align: center;
    }
  }
}
// 注册按钮
.register-btn {
  width: 100%;
}
</style>
