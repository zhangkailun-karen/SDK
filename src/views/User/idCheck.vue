<template>
 <div class="idCheck">
    <div class="payTil">
      <x-header header-title-color='#fff' :left-options="{backText: ''}">实名认证</x-header>
    </div>
    <div class="checkCon">
      <div class="checktxt">
        <p class="til">尊敬的游戏用户：</p>
        <p>您好！根据文化部《互联网文化管理暂行规定》的相关规定
及要求，游戏用户需实名认证。</p>
      </div>
      <group>
        <x-input title="真实姓名" name="mobile" placeholder="请输入姓名" type="text" label-width='0.6rem' id="chnName" v-model='data.name'
        :is-type='nameCheck' ></x-input>
        <x-input title="身份证号" name="mobile" placeholder="请输入身份证号" type="number" label-width='0.6rem' v-model='data.ID'
        :is-type='Check' ></x-input>
        <x-button type="primary" @click.native="Submission()" :disabled='disabled' >提交</x-button>
        <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask :text="toastText" position="middle"></toast>
      </group>
      <div>
        <loading v-model='show1' :text="text1"></loading>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { XInput, XHeader, XButton, Group, Toast, Loading,} from 'vux'
// import axios from 'axios'
import {nameAuthentication} from '@/api'
export default {
  data () {
    return {
      data: {
        name: '',
        ID: ''
      },
      disabled: true,
      Ncheck: false,
      idCheck: false,
      showPositionValue: false,
      toastText: '',
      show1: false,
      text1: '处理中'
    }
  },
  components: {
    XInput,
    XHeader,
    XButton,
    Group,
    Toast,
    Loading
  },
  methods: {
    Submission () {
      this.disabled = true;
      this.show1 = true
      // 异步请求
      nameAuthentication(this.data).then(res => {
        this.disabled = false
        this.show1 = false
        if (res.code == 1) {
          this.toastText = res.msg
          this.showPositionValue = true
          var self = this
          var data = JSON.parse(localStorage.getItem('4CSDK-Login'))
          data.d = 1
          data = JSON.stringify(data)
          localStorage.setItem('4CSDK-Login', data)
          setTimeout(function () {
            self.$router.push({path: '/user'})
          }, 2000)
        } else {
          this.toastText = res.msg
          this.showPositionValue = true
        }
      })
    },
    nameCheck (value) {
      var reg = /^[\u4e00-\u9fa5_a-zA-Z]+$/
      if (reg.test(value)) {
        this.Ncheck = true
      } else {
        this.Ncheck = false
      }
      if (!reg.test(value)) {
        this.disabled = true
      } else if (this.Ncheck && this.idCheck) {
        this.disabled = false
      }
      return {
        valid: reg.test(value),
        msg: '输入有误'
      }
    },
    Check (value) {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (reg.test(value)) {
        this.idCheck = true
      } else {
        this.idCheck = false
      }
      if (!reg.test(value)) {
        this.disabled = true
      } else if (this.Ncheck && this.idCheck) {
        this.disabled = false
      }
      return {
        valid: reg.test(value),
        msg: '请输入正确的身份证号码'
      }
    }
  }
}
</script>

<style lang="scss">
.idCheck {
  width: 100%;
  font-size: 0.12rem;
    .payTil {
    border-bottom: 1px solid #efefef;
    width: 90%;
    position: fixed;
    top: 0;
    background: #fff;
    z-index: 9;
    .vux-header{
      padding: 9px 0;
      background: #efefef;
      .vux-header-title {
        color: #333 !important;
        font-size: .18rem;
        height: .4rem;
        line-height: .4rem;
      }
      .vux-header-left {
        position: static;
        .left-arrow {
          left: 0.2rem;
          top: 50%;
          transform: translateY(-50%);
          &:before{
            border: 1px solid #666;
            border-width: 1px 0 0 1px;
          }
        }
      }
    }
  }
  .checkCon {
    .checktxt{
      margin-bottom: 0.2rem;
      color:#333;
      .til{
        font-size: 0.14rem;
      }
      p{
        text-align: left;
        line-height: 0.2rem;
      }
    }
    // width: 100%;
    margin: 0.6rem 0 0.64rem;
    padding: 0.25rem 0.2rem;
    .weui-btn_primary {
      background-color: #fbbc00;
      font-size: 0.14rem;
      padding: 0.03rem 0;
      &:active {
        background-color: #ecb100;
      }
    }
    .weui-cell {
      margin-bottom: 0.1rem;
      border: 1px solid #efefef;
      border-radius: 3px;
      font-size: 0.12rem;
      &:before {
        border-top: none;
      }
    }
    .weui-cell__hd {
      .weui-label {
        text-align: left;
      }
      .weui-input {
        margin-left: 0;
      }
    }
  }
}

</style>
