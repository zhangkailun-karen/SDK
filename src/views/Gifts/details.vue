<template>
  <div class="details">
  <div class="payTil">
    <x-header header-title-color='#fff' :left-options="{backText: ''}">礼包详情</x-header>
  </div>
  <div class="details-main clearfix">
    <div class="dm-left fl">
      <!-- <img src="" alt=""> -->
      <div></div>
    </div>
    <div class="dm-right">
      <p>{{data.title}}</p>
      <p>剩余：100%</p>
      <p>有效期：2018-01-08 00:00至2018-12-31 23:59</p>
    </div>
  </div>
  <div class="details-content">
      <div class="dc-top">
        <p>礼包内容</p>
        <p>{{data.content}}</p>
      </div>
      <div class="dc-bottom">
        <p>使用说明</p>
        <p>进入游戏-主页上方-兑换礼包</p>
      </div>
      <div class="dc-foot">
        <button v-tap="{methods:takePackage}" :disabled='type'>{{title}}</button>
         <toast v-model="showPositionValue" type="text" :time="1000" :text="toastText"  position="center"></toast>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import { TakeGameBag } from '@/api'
import { XHeader, Toast } from 'vux'
import $ from 'jquery'
import axios from 'axios'
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      data: 1,
      type: false, // 礼包状态
      showPositionValue: false,
      toastText: '',
      width: '1rem',
      code: '',
      title:'领取礼包'
    }
  },
  components: {
    XHeader,
    Toast
  },
  mounted () {
    this.data = JSON.parse(sessionStorage.getItem('GameBagData'))
    // 获取相应的数据
    if(this.data.code != ''){
      this.title ='已领取'
      this.type = true
      $('.dc-foot button').css('background','#aaa')
    }
  },
  methods: {
    takePackage () {
      var gamedata = JSON.parse(sessionStorage.getItem('bagData'))
      for(var i = 0 ; i < gamedata.length; i++){
        if(gamedata[i].id == this.data.id){
          gamedata[i].code = '1234234234234234'
          this.data = gamedata[i]
          sessionStorage.setItem('GameBagData', JSON.stringify(this.data))
        }
      }
      sessionStorage.setItem('bagData', JSON.stringify(gamedata))
      if(this.data.code != ''){
        this.title ='已领取'
        this.type = true
        $('.dc-foot button').css('background','#aaa')
      }
      this.showPositionValue = true
      this.toastText = '领取成功'
      setTimeout(()=>{
        this.$router.push({path:'/deposit'})
      },1000)
    },
  }
}
</script>
<style lang="scss">
html {
  height: 100%;
}
#app {
  height: 100%;
}
.details {
  font-size: 0.12rem;
  background: #fff;
  width: 100%;
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
  .details-main {
    margin-top: 0.6rem;
    padding: 0.1rem 0.15rem;
    width: 90%;
    background-color: #fff;
    // padding-top: 0.1rem;
    .dm-left {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 15px;
      background-color: pink;
      div {
      }
    }
    .dm-right {
      width: 2.51rem;
      padding-top: 0.02rem;
      margin-left: 0.7rem;
      p {
        font-family: "SourceHanSansCN-Regular";
        text-align: left;
        font-size: 0.11rem;
        color: #999;
      }
      p:nth-child(1) {
        font-size: 0.14rem;
        margin-bottom: 0.06rem;
        color: black;
      }
    }
  }
  .details-content {
    height: 4.05rem;
    background-color: #fff;
    border-top: 0.08rem solid #efefef;
    font-size: 0.13rem;
    text-align: left;
    padding: 0.2rem 0.18rem;
    overflow: hidden;
    .dc-top {
      margin-bottom: 0.25rem;
      p:nth-child(2) {
        padding-top: 0.095rem;
        font-size: 0.11rem;
        color: #999;
      }
    }
    .dc-bottom {
      p:nth-child(2) {
        padding-top: 0.095rem;
        font-size: 0.11rem;
        color: #999;
      }
    }
    .dc-foot {
      button {
        width: 90%;
        height: 0.4rem;
        background-color: #fbbc00;
        color: #fff;
        font-size: 0.14rem;
        border: none;
        border-radius: 0.04rem;
        position: absolute;
        left: 50%;
        bottom: 0.4rem;
        transform: translateX(-50%);
      }
    }
    .code {
      position: absolute;
      bottom: 0.09rem;
      width: 90%;
      height: 0.65rem;
      .gm-code {
        border: 1px solid #efefef;
        border-right: 0;
        width: 2.55rem;
        height: 0.38rem;
        line-height: 0.38rem;
        font-size: 0.12rem;
        text-indent: 0.105rem;
        color: #666;
      }
      button {
        color: #fff;
        font-size: 0.12rem;
        width: 0.95rem;
        height: 0.39rem;
        background-color: #fbbc00;
        border-radius: 0.03rem;
        border: 0;
        position: absolute;
        right: 0;
        top: 0;
        // right: .15rem;
        // top: .15rem;
      }
      .receive {
        background-color: #dcdcdc;
        color: #fff;
      }
    }
  }
}
</style>
