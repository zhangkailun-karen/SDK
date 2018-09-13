<template>
  <div class="pay_box">
    <div class="pay_zhezhao"></div>
    <div class="paybox_main">
      <div class="pay_til pr" v-tap='{ methods : payClose }'>支付中心
        <div class="pay_close pa"></div>
      </div>

      <div class="pay_cont">
        <div class="con_z">
          <div class="z_t">
            <div class="z_img fl"></div>
            <p>商品名称：{{shopName}}</p>
            <p>账号：{{zhanghao}}</p>
          </div>
          <p>账户余额：<span>{{bi}}</span> C币（1C币等于1元）</p>
        </div>
        <div class="you">您需要支付:<span>￥{{payMoney}}</span></div>
      </div>
      <div class="pay_ty">
        <div class="ty_til">请选择支付方式</div>
        <ul>
          <li v-tap='{ methods : alipay }'>
            <div class="ty_img"></div>
            <p>支付宝</p>
          </li>
          <li v-tap='{ methods : syfpay }'>
            <div class="ty_img"></div>
            <p>微信支付</p>
          </li>
          <li v-tap='{ methods : ptbpay }'>
            <div class="ty_img"></div>
            <p>C币支付</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Pay, Alipay, Syfpay, Ptbpay } from '@/api'
export default {
  data () {
    return {
      shopName: JSON.parse(localStorage.payData).k,
      bi: localStorage.money,
      zhanghao: localStorage.name,
      payMoney: JSON.parse(localStorage.payData).o,
      pay:'',
      data:''
    }
  },
  created () {
    this.data = JSON.parse(localStorage.getItem('payData'))
  },
  methods: {
    alipay () {
      // 游戏币充值初始化
      Pay(this.data).then(res => {
          var Adata = {
            ...this.data,
            ai : res.data.c,
            aj : res.data.b
          }
        Alipay(Adata).then(res => {
          eventBus.$emit('isAliPay',res.code)
          window.location.href = res.data.b
        })
      })
    },
    syfpay(){
      // 微信充值游戏币
      Pay(this.data).then(res => {
         var Syfdata = {
          ...this.data
         }
        Syfpay(Syfdata).then(res => {
          var url = unescape(res.data.pay_url)
          window.location.href = url
          eventBus.$emit('isSyfpay',res.code)
        })
      })
    },
    ptbpay(){
      Pay(this.data).then(res => {
        console.log(res)
        var Pdata = {
          ...this.data,
          ai : res.data.c,
        }
      //平台币充值游戏币
        Ptbpay(Pdata).then(res => {
          console.log(res)
        })
      })
    },
    payClose(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss'>
.pay_box{
  width: 100%;
  height: 100%;
}
.pay_zhezhao{
  background: rgba(0,0,0,.4);
  width: 100%;
  height: 100%;
}
.paybox_main {
  padding-bottom: .24rem;
  font-size: 0.12rem;
  position: absolute;
  width: 3.1rem;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.06rem;
  .pay_til {
    padding: 0.2rem 0;
    text-align: center;
    font-size: 0.18rem;
    border-bottom: 1px solid #efefef;
  }
  .pay_close {
    font-size: 0.3rem;
    top:50%;
    right:3%;
    transform: translateY(-50%);
    width: 0.17rem;
    height: 0.17rem;
    background: url(../../assets/img/sdk_sprite.png) -.9rem -0.94rem;
    background-size: 2rem;

  }
  .pay_cont {
    padding: 0.12rem 0.09rem;
    p {
      span {
        color: red;
      }
    }
    .z_img {
      width: 0.33rem;
      height: 0.38rem;
      margin-right: 0.1rem;
      background: url(../../assets/img/sdk_sprite.png) -1.5rem -0.5rem;
      background-size: 2rem;
    }
    .z_t {
      margin-bottom: 0.05rem;
      p:first-child{
        font-size: .14rem;
        color:#333;
      }
      p:nth-child(2) {
        margin-bottom: 0.06rem;
      }
    }
    .con_z {
      padding: 0.12rem 0 0.12rem 0.15rem;
      border-radius: 1px;
      width: 100%;
      background: #eeeeee;
      box-sizing: border-box;
      margin-bottom: 0.2rem;
    }
    .you{
      font-size: 0.14rem;
      margin-left: 0.14rem;
      span{
        color:red;
      }
    }

  }
  .pay_ty {
    border-top: 1px solid #efefef;
    padding: .11rem 0 0 .2rem;
    box-sizing: border-box;

    .ty_til{
      font-size: 0.14rem;
      color:#666;
      margin-bottom: 0.18rem;
    }
  ul{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    li:nth-child(2) .ty_img{
      background-position: -.9rem 0rem;
    }
    li:last-child .ty_img{
      width: 0.34rem;
      background-position: -1.5rem 0rem;
    }
    li{
      margin-right: 0.4rem;
      .ty_img{
        margin:0  auto .07rem;
        width: 0.4rem;
        height: 0.39rem;
        background: url(../../assets/img/sdk_sprite.png) -.9rem -0.5rem;
        background-size: 2rem;
      }
      p{
        font-size: 0.14rem;
      }
    }
  }
  }
}
</style>
