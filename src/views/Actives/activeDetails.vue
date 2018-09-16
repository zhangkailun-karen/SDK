<template>
 <div class="idCheck">
    <div class="payTil">
      <x-header  header-title-color='#fff' :left-options="{backText: ''}">活动详情</x-header>
    </div>
    <div class="checkCon" id='iframe-box'>
      <iframe id="ifram" src="https://www.baidu.com"></iframe>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import { Allmessage } from '@/api'
export default {
  data () {
    return {
      data: 1,
      istrue: false
    }
  },
  computed: {

  },
  mounted () {
    var ifram = document.getElementById('ifram')
    if (navigator.userAgent.match(/iPad|iPhone/i)) {
      var iframe_box = document.getElementById('iframe-box')
      iframe_box.style.width = 100 + '%'
      iframe_box.style.height = 12 +'rem'
      iframe_box.style.overflowX = 'hidden'
      iframe_box.style.overflowY = 'scroll'
      iframe_box.style.webkitOverflowScrolling = 'touch'
      // ifram.setAttribute('scrolling', 'no')
      // iframe_box.appendChild(ifram)
    }
  },
  methods: {

  }

}
</script>

<style lang="scss">
#ifram{
    border: 0;
    width: 100%;
    height:100%;
  }
.idCheck{
  width: 100%;
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
    width: 100%;
    height: 5.6rem;
    margin-top:0.6rem;
  }
}
</style>
