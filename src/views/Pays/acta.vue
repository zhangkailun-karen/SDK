<template>
  <div class="acta">
    <div class="acta-title">
        <div class="payTil">
          <x-header header-title-color='#fff' :left-options="{backText: ''}">交易记录</x-header>
        </div>
    </div>
    <div class="acta-main">
        <div class="am-left " v-tap="{ methods:payrecord }">充值记录</div>
        <div class="am-right" v-tap="{ methods:consumption }">消费记录</div>
    </div>
      <img class="imgs" src="../../assets/img/ht_dingdan.png" width="45%" alt="" v-show='pic'>
    <div class="acta-content" ref="acta">
      <ul>
        <li  v-for='(item, index) in data' class="tab1" v-show='show'>
          <div class="ac-left">
            <p>{{item.payway==='syfpay'?'支付宝':'微信'}}支付</p>
            <p>{{item.create_time}}</p>
          </div>
          <div class="ac-right">+{{item.amount}} C币
            <p v-if='item.status===1'>支付失败</p>
          </div>
        </li>
        <li v-for ='(item,index) in data2' class="tab2" v-show='show2'>
           <div class="ac-left">
            <p>{{item.payway==='syfpay'?'支付宝':'微信'}}支付</p>
            <p>{{item.create_time}}</p>
          </div>
          <div class="ac-right">+{{item.amount}} C币</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { Consumption, Payrecord } from '@/api'
import { setTimeout } from 'timers'
import BScroll from 'better-scroll'
const options = {
  scrollY: true
}
export default {
  data () {
    return {
      data: '',
      data2: '',
      pic: true,
      show: true,
      show2: false
    }
  },
  mounted () {
    var that = this
    var a = JSON.parse(localStorage.getItem('4CSDK-Login')).b
    // 默认请求充值记录
    Payrecord(a).then(res => {
      that.data = res.data
      // 循环存入data
      for (let i = 0; i < res.data.length; i++) {
        this.data[i].create_time = times(this.data[i].create_time)
      }
      // 时间戳转换
      function times (time) {
        var date = new Date(time * 1000)
        var Y = date.getFullYear() + '-'
        var M =
          (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()

        return Y + M + D + h + m + s
      }
      // 判断是否有数据
      if (this.data.length === 0) {
        this.pic = true
      } else {
        this.pic = false
      }
    })
    Consumption(a).then(res => {
      this.data2 = res.data
    })
    $('.tab2').hide()
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.acta, options)
      this.scroll.refresh()
    }, 20)
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    // 充值记录请求
    payrecord () {
      // var a = localStorage.userToken
      this.show = true
      this.show2 = false
      if (this.data.length === 0) {
        this.pic = true
      } else {
        this.pic = false
      }
      // tab栏
      $('.am-right').css('backgroundColor', '#fff')
      $('.am-right').css('color', '#fbbc00')
      $('.am-left').css('backgroundColor', '#fbbc00')
      $('.am-left').css('color', '#fff')
    },
    // 消费记录请求
    consumption () {
      this.show2 = true
      this.show = false
      if (this.data2.length === 0) {
        this.pic = true
      } else {
        this.pic = false
      }
      // var a = localStorage.userToken
      $('.am-left').css('backgroundColor', '#fff')
      $('.am-left').css('color', '#fbbc00')
      $('.am-right').css('backgroundColor', '#fbbc00')
      $('.am-right').css('color', '#fff')
    }
  }
}
</script>
<style lang='scss'>
.acta {
  margin-top: 0.9rem;
  font-size: 0.12rem;
  background-color: #fff;
  height: 100%;
  .payTil {
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
        font-size: 0.18rem;
        height: 0.4rem;
        line-height: 0.4rem;
      }
      .vux-header-left {
        position: static;
        .left-arrow {
          left: 0.2rem;
          top: 50%;
          transform: translateY(-50%);
          &:before {
            border: 1px solid #666;
            border-width: 1px 0 0 1px;
          }
        }
      }
    }
  }
  .acta-main {
    font-size: 0.13rem;
    text-align: center;
    display: flex;
    justify-content: center;
    margin-bottom: 0.15rem;
    .am-left {
      border: 1px solid #fbbc00;
      width: 0.92rem;
      line-height: 0.29rem;
      height: 0.29rem;
      background-color: #fff;
      color: #fff;
      border-radius: 6px 0px 0px 6px;
      background-color: #fbbc00;
    }
    .am-right {
      border: 1px solid #fbbc00;
      border-radius: 0 6px 6px 0;
      width: 0.92rem;
      line-height: 0.29rem;
      height: 0.29rem;
      color: #fbbc00;
    }
  }
  img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  .acta-content {
    overflow: hidden;
    font-size: 0.14rem;
    text-align: left;
    height: 100%;
    ul {
      padding: 0 0.15rem;
      li:nth-child(1) {
        border-top: 1px solid #efefef;
      }
      li {
        padding-top: 0.13rem;
        width: 100%;
        height: 0.56rem;
        border-bottom: 1px solid #efefef;
        .ac-left {
          float: left;
          p:nth-child(2) {
            padding-top: 0.08rem;
            color: #999;
          }
        }
        .ac-right {
          float: right;
          // line-height: 0.56rem;
          padding-top: .08rem;
          color: #ff9800;
          p{
              // line-height: .09rem;
              color: #f07b7b;
            font-size: .11rem;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
