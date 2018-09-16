<template>
 <div class="active">
    <div class="active-title">
          <div class="at-center ">
                <p>活动</p>
          </div>
    </div>
    <div class="active-main" ref="active_main" >
      <div class="cot" >
        <group>
          <cell-box title="cell" @click.native='check' is-link>
            demo
          </cell-box>
        </group>
      </div>
    </div>
 </div>
</template>

<script>
// import axios from 'axios'
import { ActivityMessage } from '@/api'
import BScroll from 'better-scroll'
import { InlineLoading } from 'vux'
const options = {
  scrollY: true
}
export default {
  data () {
    return {
      data: 1,
      type:false
    }
  },
  components: {
    InlineLoading
  },
  mounted() {

  },
  methods: {
    check(){
      this.$router.push({path:'/activeDetails'})
    }
  }
}
</script>

<style lang="scss">
.active {
  font-size: 0.16rem;
  overflow: auto;
  width:100%;
  height: 100%;
  .active-title {
    font-size: 0.18rem;
    width: 90%;
    height: 0.6rem;
    background-color: #efefef;
    position: fixed;
    z-index: 2;
    text-align: center;
    .at-center {
      padding: 0.2rem 0;
    }
  }
  .active-main {
    height: 80%;
    overflow: hidden;
    .cot{
      padding-top: 0.6rem;
    }
    .weui-cells,.vux-no-group-title{
      margin-top: 0;
    }
    .weui-cell{
      width: 93%;
      height: 0.3rem;
    }
    ul {
      li {
      padding: 0.2rem 0.15rem 0;
        height: 0.31rem;
        font-family: "SourceHanSansCN-Regular";
        font-size: 0.13rem;
        text-align: left;

      }
      li:nth-last-child(1){
        margin-bottom: .64rem;
      }
    }
  }
}
</style>
