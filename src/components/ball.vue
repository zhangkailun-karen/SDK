<template>
  <div class="content">
    <!-- 悬浮球 -->
    <div id="ball" v-tap="{methods:fTap}"></div>
    <!-- 遮罩层 -->
    <div class="bg_black" v-tap="{methods:bgTap}"></div>
    <!-- 侧边栏 -->
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
    }
  },
  methods: {
    // 触摸浮球，浮球隐藏，遮罩层打开，侧边栏显示
    fTap () {
      console.log(1)
      $('#ball').hide()
      $('.bg_black').show()
      $('.left_box').animate({left: '0'}, 200)
    },
    // 触摸遮罩层，侧边栏和遮罩层隐藏，小球显示
    bgTap () {
      $('#ball').show()
      $('.bg_black').hide()
      $('.left_box').animate({left: '-80%'}, 200)
    }
  },
  mounted () {
    var flag = 0 // 标记是拖曳还是点击
    var oDiv = document.getElementById('ball')
    var disX, disY, moveX, moveY, L, T, starX, starY, starXEnd, starYEnd
    oDiv.addEventListener('touchstart', function (e) {
      oDiv.style.transition = 'none'
      oDiv.style['transition'] = 'none'
      oDiv.style.opacity = '1'
      flag = 0
      e.preventDefault() // 阻止触摸时页面的滚动，缩放
      disX = e.touches[0].clientX - this.offsetLeft
      disY = e.touches[0].clientY - this.offsetTop
      // 手指按下时的坐标
      starX = e.touches[0].clientX
      starY = e.touches[0].clientY
      // console.log(disX);
    })
    oDiv.addEventListener('touchmove', function (e) {
      flag = 1
      L = e.touches[0].clientX - disX
      T = e.touches[0].clientY - disY
      // 移动时 当前位置与起始位置之间的差值
      starXEnd = e.touches[0].clientX - starX
      starYEnd = e.touches[0].clientY - starY
      // console.log(L);
      if (L < 0) { // 限制拖拽的X范围，不能拖出屏幕
        L = 0
      } else if (L > document.documentElement.clientWidth - this.offsetWidth) {
        L = document.documentElement.clientWidth - this.offsetWidth
      }
      if (T < 0) { // 限制拖拽的Y范围，不能拖出屏幕
        T = 0
      } else if (T > document.documentElement.clientHeight - this.offsetHeight) {
        T = document.documentElement.clientHeight - this.offsetHeight
      }
      moveX = L + 'px'
      moveY = T + 'px'
      console.log('moveX' + moveX)
      this.style.left = moveX
      this.style.top = moveY
    })
    // 屏幕宽度
    var windowWith = document.documentElement.clientWidth
    oDiv.addEventListener('touchend', function (e) {
      oDiv.style.transition = 'all .2s'
      oDiv.style['transition'] = 'all .2s'
      console.log('oDiv.offsetWidth' + oDiv.offsetWidth)
      if (L >= (windowWith - oDiv.offsetWidth) / 2) {
        // 如果浮球靠左边，让它贴左边屏幕
        oDiv.style.left = windowWith - oDiv.offsetWidth + 'px'
        // 当浮球触碰到边缘，2秒后自动往左缩进自身的一半，变成半透明
        setTimeout(() => {
          oDiv.style.left = (windowWith - oDiv.offsetWidth / 2) + 'px'
          oDiv.style.opacity = '0.5'
        }, 2000)
      } else {
        oDiv.style.left = 0
        // 当浮球触碰到右边缘，2秒后自动往右缩进自身的一半，变成半透明
        setTimeout(() => {
          oDiv.style.left = (-oDiv.offsetWidth / 2) + 'px'
          oDiv.style.opacity = '0.5'
        }, 2000)
      }
      // alert(parseInt(moveX))
      // // 判断滑动方向
      // if (flag === 0) { // 点击
      //   window.location.href = ''
      // }
    })
  }
}
</script>

<style lang="scss" scoped>
  #ball{
    width: 50px;
    height: 50px;
    background: pink;
    position: fixed;
    top:20px;
    right:20px;
    border-radius: 50%;
    z-index: 9;
  }
  .bg_black{
    background: rgba(0,0,0,0.7);
    display: none;
    // left: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
  }
</style>
