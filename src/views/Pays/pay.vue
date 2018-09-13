<template>
  <div class="pay">
    <div class="pay-title">
      <div class="payTil">
        <x-header header-title-color='#fff' :left-options="{backText: ''}">充值金额</x-header>
      </div>
      <div class="pay-main">
        <div class="pm-top">
          <div class="pmt-title">
            请选择充值金额
          </div>
          <div class="pmt-content">
              <ul class="list">
                <li id="active" value='100'>100元</li>
                <li value='500'>500元</li>
                <li value='1000'>1000元</li>
                <li value='2000'>2000元</li>
                <li value='3000'>3000元</li>
                <li value='5000'>5000元</li>
              </ul>
              <div class="pc-precio">充值金额(元)<input type="number" v-model="num" placeholder="100"></div>
          </div>
        </div>
        <div class="pm-center">
          <div class="pmc-title">
            支付方式
          </div>
          <div class="pmc-main">
            <ul>
              <li v-tap="{ methods: alipay }" class="zhifubao pr">
                <div class="ali_icon pa"></div>
                <img src="../../assets/img/sfpay_icon.png" class="pa" alt="" width="25%">
                支付宝</li>
              <li v-tap="{ methods: syfpay }" class="weixin pr">
                <img src="../../assets/img/wechat_icon.png" class="pa" alt="" width="24%">
                <div class="tex_icon pa"></div>
                微信支付</li>
            </ul>
          </div>
        </div>
        <div class="pm-foot">
          <button v-tap="{ methods: test }" >立即充值</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang='scss'>
.pay {
  font-size: 0.12rem;
  background: #fff;
  width: 100%;
  // height: 100%;
  height: 530px;
  position: relative;
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
  .pay-main {
    text-align: left;
    font-size: 0.14rem;
    padding: 0.8rem 0.18rem;
    .pm-top {
      margin-bottom: 6%;
      .pmt-title {
        margin-bottom:0.15rem;
      }
      .pmt-content {
        background-color: #fff;
        .pc-precio {
          border-radius: 5px;
          border: 1px solid #c6c6c6;
          height: 0.4rem;
          font-size: 0.14rem;
          text-indent: 0.17rem;
          color: #212121;
          padding: 0.01rem;
          input{
            height: 100%;
            border: none;
            width: 60%;
            text-indent: 17px;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          li {
              width: .9rem;
              height: 0.42rem;
              background-color: #fff;
              color: #212121;
              border-radius: 5px;
              border: 1px solid #c6c6c6;
              text-align: center;
              line-height: 0.42rem;
          }
          li:nth-child(4),
          li:nth-child(5),
          li:nth-child(6) {
           margin:.12rem 0;
          }
        }
      }
    }
    .pm-center {
      .pmc-title {
        color: #212121;
        margin-bottom: 0.21rem;
      }
      .pmc-main {
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            font-size: 0.13rem;
            text-indent: 29px;
            width: 0.92rem;
            height: 0.42rem;
            color: #212121;
            border-radius: 5px;
            border: 1px solid #c6c6c6;
            text-align: center;
            line-height: 0.42rem;
            img{
              top:50%;
              transform: translateY(-50%);
              left:.1rem;
            }
          }
          li:nth-child(2) {
            margin-left: 0.25rem;
          }
          // .weixin{
          //   background:#eee;
          // }
        }
      }
    }
    .pm-foot {
      position: absolute;
      top: 83%;
      width: 100%;
      text-align: center;
      transform: translateX(-50%);
      left: 50%;
      button {
        width: 90%;
        height: 0.4rem;
        background-color: #fbbc00;
        color: #fff;
        font-size: 0.14rem;
        border: none;
        border-radius: 4px;
      }
    }
  }
}
.zhifubao{
  img{
    top:50%;
    transform: translateY(-50%);
    left:.1rem;
  }
}
.ali_icon,.tex_icon{
  display: none;
  width: 0.2rem;
  height: 0.2rem;
  background: url(../../assets/img/ali_icon.png) no-repeat 0 0;
  background-size: 100%;
  right: 0;
  bottom: 0;
}
.tex_icon{
  background-image: url(../../assets/img/tex_icon.png);
}
#active {
  background-color: #fbbc00;
  color: #fff;
}
</style>
<script>
import $ from 'jquery'
import { Payptb, Alipayptb, Syfpayptb } from '@/api'
export default {
  data () {
    return {
      num: '100',
      type: '', // 支付方式
      payUrl: '' // 跳转的支付链接
    }
  },
  methods: {
    reverse () {
      this.$router.go(-1)
    },
    alipay () { // 支付宝
      this.type = 'alipay'
      $('.zhifubao').css('borderColor', '#209fdb')
      $('.weixin').css('borderColor', '#c6c6c6')
      $('.ali_icon').show()
      $('.tex_icon').hide()
    },
    syfpay () { // 微信支付
      this.type = 'syfpay'
      $('.weixin').css('borderColor', '#41b035')
      $('.zhifubao').css('borderColor', '#c6c6c6')
      $('.ali_icon').hide()
      $('.tex_icon').show()
    },
    test () {
      var paydata = {
        num: this.num,
        paytype: this.type,
        z: JSON.parse(localStorage.getItem('4CSDK-Login')).b,
        v: JSON.parse(localStorage.getItem('4CSDK-Login')).a
      }
      Payptb(paydata).then(res => {
        var aj = res.data.b
        var ai = res.data.c
        var z = JSON.parse(localStorage.getItem('4CSDK-Login')).b
        var v = JSON.parse(localStorage.getItem('4CSDK-Login')).a
        var o = '1'
        var j = this.type
        if (this.type === 'syfpay') {
          Syfpayptb(aj, z, v, o, j).then(res => {
            this.payUrl = unescape(res.data.pay_url)
            location.href = this.payUrl
          })
        } else {
          Alipayptb(v, ai, aj, o, z).then(res => {
            location.href = res.data.b
          })
        }
      })
    }
  },
  mounted () {
    this.alipay()
    // var list =   document.getElementsByClassName('list').childrens

    var that = this
    $('.list').children('li').on('click', function () {
      $(this).css({'background': '#fbbc00', 'color': '#fff', 'border': '1px solid transparent'}).siblings().css({'background': '#fff', 'color': '#000', 'border': '1px solid #c6c6c6'})
      that.num = $(this).attr('value')
    })
  }
}
</script>
