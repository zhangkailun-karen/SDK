<template>
  <div class="loginingbox clearfix">
    <div class="user_img fl">
      <img src="../../assets/img/icon.png" alt="">
    </div>
    <span class="username fl">TOWN</span>
    <div id="loading">
      <load-more class="fl"></load-more>
      <span class="text fl">正在登录中……</span>
    </div>
    <div class="toggle fr" v-tap="{methods:stoplogin}"></div>
  </div>
</template>
<script>
import { clearTimeout } from 'timers';
import { setTimeout } from 'timers';
import { Getlocal, Setlocal } from '@/api'

export default {
  data () {
    return {

    }
  },
  methods: {
    stoplogin(){
      this.stoplogin
    }
  },
  mounted () {
    if(turn){
      clearTimeout(turn)
    }
    var self = this
    var turn = setTimeout(() => {
      self.$router.push({path:'/user'})
    }, 1000)
    function stoplogin(){
      let SDKDATA = Getlocal('4CSDK-Login')
      SDKDATA.b = null
      this.$router.push({path:'/login'})
    }
  }
}
</script>
<style lang="less">
  .loginingbox{
    background-color: #fff;
    width: 250px;
    height: 100px;
    position: absolute;
    top: 1.2rem;
    left:50%;
    transform: translateX(-50%);
    border-radius:8px;
    padding: 20px 15px;
    box-sizing: border-box;
    .user_img{
      width: 60px;
      height: 60px;
      background-color:#6cf;
      border-radius:50%;
      overflow: hidden;
      img{
        width:100%;
      }
    }
    .username{
      margin: 8px 0 0 10px;
      font-size:20px;
      color:#666;
    }
    #loading{
      position: absolute;
      top: 55px;
      left: 80px;
      .weui-loadmore{
        width:auto;
        margin:0;
        // position: absolute;
        // top: 55px;
        // left: 85px;
      }
      .text{
        font-size:12px;
        color:#000;
        padding:5px;
      }
    }
    .toggle{
      width: 50px;
      height: 50px;
      border-radius:50%;
      background-color: #0a0;
      margin-top: 5px;
    }
  }
</style>
