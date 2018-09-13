<template>
 <div class="recommend">
    <div class="rm-title">
          <div class="rt-center ">
                <p>推荐</p>
          </div>
    </div>
    <div id="iframe-box">
      <iframe id="ifram" src="https://www.baidu.com"></iframe>
    </div>
 </div>
</template>
<style lang="scss" scoped>
  #ifram{
    border: 0;
    width: 100%;
    height:100%;
  }
  .recommend{
    height: 100%;
    overflow: hidden;
     iframe{
      margin: .6rem 0 .6rem;
     height: 5.6rem;
    }
    .rm-title {
      text-align: center;
    font-size: 0.18rem;
    width: 90%;
    height: 0.6rem;
    background-color: #efefef;
    position: fixed;
    z-index: 2;

    .rt-center {
      padding: 0.215rem 0;
    }
    .rt-right {
      position: absolute;
      right: 0.15rem;
      top: 0.23rem;
      p {
        font-size: 0.14rem;
        width: 0.43rem;
        height: 0.185rem;
      }
    }
  }
  }
</style>
<script>
export default {
  data () {
    return {

    }
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
  }

}
</script>
