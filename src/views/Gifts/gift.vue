<template>
<div class='gift'>
    <div class="gift-title">
          <div class="gt-center">
                <p>礼包</p>
          </div>
          <div class="gt-right" v-if='type'>
            <p v-tap='{methods:deposit}'>存号箱</p>
          </div>
          <div v-else>
            <p style="text-align:center;margin-top:1rem">
              <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中...&nbsp;&nbsp;</span>
              <inline-loading></inline-loading>
            </p>
          </div>
    </div>
    <div class="gift-main" ref="wrapper">
      <ul class="content">
        <li v-if='data !=1' v-for='(item,index) in data'>
          <p>{{item.title}}</p>
          <p>{{item.content}}</p>
          <button v-if="data[index].code == ''" v-tap='{methods:details,index:item.id}'>领取</button>
          <button class='check' v-else @click='Submission'>已领取</button>
          <group>
            <toast v-model="showPositionValue" type="text" :time="1000" :text="toastText" position="middle"></toast>
          </group>
        </li>
      </ul>
    </div>
</div>
</template>
<script>
import { Gamebag } from '@/api'
import BScroll from 'better-scroll'
import { InlineLoading } from 'vux'
const options = {
  scrollY: true
}
export default {
  data () {
    return {
      data: 1,
      startTime: '',
      endTime: '',
      showPositionValue: false,
      toastText: '',
      type:false
    }
  },
  components: {
    InlineLoading
  },
  mounted () {
    // 礼包请求
    var a = JSON.parse(localStorage.getItem('4CSDK-Login')).a
    var b = JSON.parse(localStorage.getItem('4CSDK-Login')).b
    console.log(a,b)
    if (sessionStorage.getItem('gift')) {
      this.data = JSON.parse(sessionStorage.getItem('gift'))
      this.type = true
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].content.length > 20) {
          if (this.data[i].content.indexOf('\n') != -1) {
            var num = this.data[i].content.indexOf('\n')
            this.data[i].content = this.data[i].content.substring(0, num) + '....'
          }
        }
      }
    } else {
      Gamebag().then(res => {
        this.type = true
        if(res.code === 1){
          this.data = res.data
          if(typeof this.data[0]=='undefined')return
          // 数据存到localStorage
          sessionStorage.setItem('gift', JSON.stringify(this.data))
          for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].content.length > 20) {
              if (this.data[i].content.indexOf('\n') != -1) {
                var num = this.data[i].content.indexOf('\n')
                this.data[i].content = this.data[i].content.substring(0, num) + '....'
              }
            }
          }
          // 存号箱数据
          var data = this.data.filter((item) => {
            return item.code != ''
          })
          sessionStorage.setItem('deposit', JSON.stringify(data))
        }
      })
    }
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.wrapper, options)
      this.scroll.refresh()
    }, 20)
  },
  methods: {
    details (e) {
      var _this = this
      // 得到相应的ID去把数据存在 localStorage ，好在details 中使用
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].id == e.index) {
          sessionStorage.setItem('GameBagData', JSON.stringify(this.data[i]))
        }
      }
      _this.$router.push({path: '/details'})
    },
    deposit () {
      this.$router.push({path: '/deposit'})
    },
    Submission () {
      this.toastText = '已经领取，请到存号箱查看'
      this.showPositionValue = true
    }
  }
}
</script>

<style lang="scss" scoped>
.gift {
  height: 100%;
  .gift-title {
    text-align: center;
    top: 0;
    font-size: 0.18rem;
    width: 90%;
    height: 0.6rem;
    background-color: #efefef;
    position: fixed;
    z-index: 2;

    .gt-center {
      padding: 0.215rem 0;
    }
    .gt-right {
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
  .gift-main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    ul {
      background-color: #fff;
      padding:0.6rem 0.145rem;
      text-align: left;
      li {
        padding-top: 0.145rem;
        position: relative;
        border-bottom: 1px solid #efefef;
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
          margin-bottom: .125rem;
          width: 2.025rem;

        }
        button {
          width: 0.445rem;
          height: 0.245rem;
          background-color: #fbbc00;
          border-radius: 6px;
          border: 0 ;
        position: absolute;
        right: .15rem;
        top: .15rem;
         color:#fff;
        }
        .check{
            background-color:#ccc;
        }
        }
        .receive{
          background-color: #dcdcdc;

      }
    }
  }
}
</style>
