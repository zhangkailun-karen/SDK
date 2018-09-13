<template>
  <div class="content">
<!-- 悬浮球 -->
    <div id="ball" v-tap='{methods:fTap}'></div>
    <!-- 遮罩层 -->
    <div class="bg_black" v-tap='{methods:bgTap}'></div>
    <!-- 侧边栏 -->
    <div class="out">
    <div class="left_box">
      <div class="close_btn"></div>
      <div class="box_cont">
        <router-view></router-view>
      </div>
      <div class="box_down">
        <tabbar>
          <tabbar-item link='/user' v-model="user" selected @on-index-change="make">
            <!-- <img slot="icon" src="../../assets/img/menu-account-n.png">
            <img slot="icon-active" src="../../assets/img/menu-account-h.png"> -->
            <div slot="icon" class="zhanghao_n"></div>
            <div slot="icon-active" class="zhanghao_h"></div>
            <span slot="label">账号</span>
          </tabbar-item>
          <tabbar-item link='/active'>
            <div slot="icon" class="active_n"></div>
            <div slot="icon-active" class="active_h"></div>
            <span slot="label">活动</span>
          </tabbar-item>
          <tabbar-item link='/gift'>
            <div slot="icon" class="gift_n"></div>
            <div slot="icon-active" class="gift_h"></div>
            <span slot="label">礼包</span>
          </tabbar-item>
          <tabbar-item link='service'>
            <div slot="icon" class="ser_n"></div>
            <div slot="icon-active" class="ser_h"></div>
            <span slot="label">客服</span>
          </tabbar-item>
          <tabbar-item link='/recommend'>
            <div slot="icon" class="rec_n"></div>
            <div slot="icon-active" class="rec_h"></div>
            <span slot="label">推荐</span>
          </tabbar-item>
        </tabbar>
      </div>
    </div>
      <div class="fuqiu" v-tap='{methods:bgTap}'></div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { ball } from '../ball'
export default {
  data () {
    return {
      user: '/index'
    }
  },
  created () {

  },
  methods: {
    make () {

    },
    // 触摸浮球，浮球隐藏，遮罩层打开，侧边栏显示
    fTap () {
      $('#ball').hide()
      $('.bg_black').show()
      $('.left_box').animate({ left: '0' }, 200)
      $('.fuqiu').animate({ left: '3.3rem' }, 200)
    },
    // 触摸遮罩层，侧边栏和遮罩层隐藏，小球显示
    bgTap () {
      $('#ball').show()
      $('.bg_black').hide()
      $('.left_box').animate({ left: '-100%' }, 200)
      $('.fuqiu').animate({ left: '-0.3rem' }, 200)
    }

  },
  mounted () {
    ball()
    // 导航刷新后不消失选中状态
    // // if(this.$route.path == '/pay')
    // // weui-bar__item_on
    // var nor = $('.box_down .weui-tabbar__item')
    // for (let i = 0; i < nor.length; i++) {
    //   if (this.$route.path === '/active' || '/gift' || '/service' || 'recommend') {
    //     nor[i].classList.add('weui-bar__item_on')
    //   }
    // }

    if (this.$route.path === '/pay' || this.$route.path === '/message' || this.$route.path === '/acta' || this.$route.path === '/details') {
      $('.box_down').hide()
    } else {
      $('.box_down').show()
    }
  },
  updated () {
    if (this.$route.path === '/pay' || this.$route.path === '/message' || this.$route.path === '/acta' || this.$route.path === '/details') {
      $('.box_down').hide()
    } else {
      $('.box_down').show()
    }
  }
}
</script>

<style lang="scss">
.out{
  width: 100%;
  height: 100%;
}
.content{
  height: 100%;
}
#ball {
  width: 40px;
  height: 40px;
  background: url(../../assets/img/icon.png);
  background-size: 100%;
  position: fixed;
  top: 20px;
  right: 0;
  border-radius: 50%;
  z-index: 9;
}
.box_cont{
  height: 92%;
  overflow: hidden;
}
.fuqiu {
    position: absolute;
    left: -0.3rem;
    z-index: 99;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 0.23rem;
    height: 0.62rem;
    background: url('../../assets/img/l_fuqiu.png') no-repeat;
    background-size: 100%;
    border: none;
  }

.bg_black {
  background: rgba(0, 0, 0, 0.7);
  display: none;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.left_box {
  width: 90%;
  position: absolute;
  height: 100%;
  background: #fff;
  z-index: 99;
  left: -100%;
  overflow: hidden;
  top: 0;
  box-sizing: border-box;

}
.zhanghao_n,.zhanghao_h,.active_n,.active_h,.rec_n,.rec_h,.gift_n,.gift_h,.ser_n,.ser_h{
  width: 100%;
  height: 100%;
  background: url(../../assets/img/sdk_sprite.png) .02rem -1.3rem;
  background-size:2.4rem;
}
.zhanghao_h{
  background-position: -.23rem -1.3rem;
}
.active_n{
  background-position: 0 -1.6rem;
}
.active_h{
  background-position: -.29rem -1.6rem;
}
.gift_n{
  background-position: 0.01rem -1.92rem;
}
.gift_h{
  background-position: -.26rem -1.92rem;
}
.ser_n{
  background-position: 0.01rem -2.24rem;
}
.ser_h{
  background-position: -.28rem -2.24rem;
}
.rec_n{
  background-position: 0.02rem -2.53rem;
}
.rec_h{
  background-position: -.26rem -2.53rem;
}
.box_down {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  .weui-tabbar {
    background: #000;
  }
  .weui-tabbar__icon {
    width: .24rem;
    height: .28rem;
    img {
      width: auto;
    }
  }
  .weui-tabbar__label {
    color: #5e88fb;
  }
  .weui-tabbar__item.weui-bar__item_on {
    .weui-tabbar__label {
      color: #fbbc00;
    }
  }
  .el-menu {
    width: 100%;
    .el-menu-item {
      height: 64px;
      width: 20%;
      line-height: 7;
    }
  }
}
</style>
