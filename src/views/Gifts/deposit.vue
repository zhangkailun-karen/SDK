<template>
<div class='gift_list'>
    <div class="payTil">
      <x-header header-title-color='#fff' :left-options="{backText: ''}">存号箱</x-header>
    </div>
    <div class="gift-main" ref="gift_main">
      <ul>
        <li v-for='(item,index) in data'>
          <p>{{item.title}}</p>
         <p class='content'>{{item.content}}</p>
          <div class="code">
            <div class="gm-code" >
              <p id='foo'>激活码&nbsp;&nbsp;&nbsp;&nbsp;{{item.code}}</p>
            </div>
            <button @click='copy' class='btn' :data-clipboard-text="item.code">复 制</button>
          </div>
        </li>
      </ul>
          <toast v-model="showPositionValue" type="text" :time="1000" :text="toastText" style='height:10px'  position="middle"></toast>
    </div>
</div>
</template>
<script>
import Clipboard from 'clipboard'
import $ from 'jquery'
import BScroll from 'better-scroll'
const options = {
  scrollY: true
}
export default {
  data () {
    return {
      data: 1,
      showPositionValue: false,
      toastText: ''
    }
  },
  created () {
    if(sessionStorage.bagData){
      var check = JSON.parse(sessionStorage.getItem('bagData'))
      this.data = check.filter((item)=>{
        return item.code != ''
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.gift_main, options)
      this.scroll.refresh()
    }, 20)
  },
  methods: {
    reverse () {
      this.$router.go(-1)
    },
    copy () {
      $('li').on('click', 'button', function () {
        var clipboard = new Clipboard('.btn')
        clipboard.on('success', e => {
          // 释放内存
          e.clearSelection()
          clipboard.destroy()
        })
      })
      this.toastText = '复制成功'
      this.showPositionValue = true
    }
  }
}
</script>
<style lang="scss">
.weui-toast{
  left: 45%;
}
html{
  height: 100%;
}
.gift_list {
  font-size: 0.12rem;
  width:100%;
  height: 100%;
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
  .gift-main {
    margin: .6rem 0;
    height: 80%;
    background-color: #fff;
    ul {

      text-align: left;
      li {
      padding:  0.2rem  0.145rem;
        position: relative;
        border-bottom: 0.08rem solid #efefef;
        p {
          font-family: " SourceHanSansCN-Regular";
        }
        p:nth-child(1) {
          font-size: 0.14rem;
        }
        p:nth-child(2) {
          font-size: 0.1rem;
          color: #999;
          line-height: 0.175rem;
          margin-bottom: 0.45rem;
        }
        .code {
          position: absolute;
          bottom: 0.17rem;
          width: 90%;
          height: 0.25rem;
          .gm-code {
            border: 1px solid #efefef;
            border-right: 0  ;
            width: 2.55rem;
            height: 0.25rem;
            line-height: 0.25rem;
            font-size: 0.12rem;
            text-indent: 0.105rem;
            color: #666;
          }
          button {
            color: #fff;
            font-size: 0.12rem;
            width: 0.65rem;
            height: 0.26rem;
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
  }
}
</style>
