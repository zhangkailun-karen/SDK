<template>
 <div class="idCheck">
    <div class="payTil">
      <x-header :title="data.post_title" header-title-color='#fff' :left-options="{backText: ''}"></x-header>
    </div>
    <div class="checkCon">
      <iframe src="http://www.baidu.com" ></iframe>
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
    this.data = JSON.parse(sessionStorage.getItem('active'))
  },
  methods: {

  }

}
</script>

<style lang="scss">
.idCheck{
  width: 90%;
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
    margin-top:0.6rem;
    iframe{
      border:none;
      width: 116%;
      height: 5.5rem;
    }
  }
}
</style>
