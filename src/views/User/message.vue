<template>
 <div class="idCheck" >
    <div class="checkTil">
      <x-header header-title-color='#ccc' :left-options="{backText: ''}">消息</x-header>
    </div>
    <div v-if='type'>
    <p style="text-align:center;margin-top:1.78rem">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中...&nbsp;&nbsp;</span><inline-loading></inline-loading>
    </p>
  </div>
    <div class="checkCon" v-if="data != 1">
      <div class="checktxt">
        <p class = 'title'>{{data[0].post_title}}</p>
        <p class="til">亲爱的玩家:</p>
        <p >{{data[0].post_excerpt}}</p>
        <div class='down-til'>
            <p>16游戏团队</p>
            <p>{{data[0].post_modified}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { XInput, XHeader, XButton, Group, InlineLoading} from 'vux'
// import axios from 'axios'
import { Allmessage } from '@/api'
export default {
  data () {
    return {
      data: 1,
      type:false
    }
  },
  components: {
    XInput,
    XHeader,
    XButton,
    Group,
    InlineLoading
  },
  created () {
    this.type = true
    Allmessage().then(res => {
      if(res.code == 1){
        this.type = false
        this.data = res.data
        if(typeof this.data[0] == 'undefined'){
          this.data = 1
        }
      }
    })
  },
  methods: {

  }
}
</script>

<style lang="scss">
.idCheck {
  width: 100%;
  font-size: 0.12rem;
  .checkTil {
   // 头部
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
  .checkCon {
    .checktxt{
      .title{
        text-align:center;
        margin-bottom:0.1rem;
        font-size:0.15rem;
      }
      margin-bottom: 0.2rem;
      color:#333;
      .til{
        font-size: 0.14rem;
      }
      p{
        text-align: left;
        line-height: 0.2rem;
      }
      .down-til{
        float:right;
      }
    }
    margin: 0.5rem 0 0.64rem;
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
      width: 90%;
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
