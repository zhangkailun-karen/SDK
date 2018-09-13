<template>
  <div class="editPwd">
    <div class="payTil">
      <x-header header-title-color='#fff' :left-options="{backText: ''}">修改密码</x-header>
    </div>
    <div class="editCon">
      <!-- <group> -->
        <x-input v-model="pwd.oldpassword" title="原密码" name="mobile" placeholder="请输入原密码" type="password" label-width='0.6rem'></x-input>
        <x-input v-model="pwd.newpassword" title="新密码" name="mobile" placeholder="6-16位数字或字母,区分大小写" type="password" label-width='0.6rem'></x-input>
        <x-input v-model="pwd.new2password" title="确认密码" name="mobile" placeholder="6-16位数字或字母,区分大小写" type="password" label-width='0.6rem'></x-input>
        <x-button v-tap='{methods:send}' type="primary" action-type="button">确定修改</x-button>
      <!-- </group> -->
      <group>
        <toast v-model="showPositionValue" type="text" :time="1000" :text="toastText" position="middle"></toast>
      </group>
    </div>
    <div>
      <loading v-model='show1' :text="text1"></loading>
    </div>
  </div>
</template>
<script>
import { XInput, XHeader, XButton,Toast,Group,Loading} from 'vux'
import {Updatepw} from '@/api'
export default {
  data () {
    return {
      pwd: {
        oldpassword: '',
        newpassword: '',
        new2password: ''
      },
      toastText:'',
      showPositionValue:false,
      show1:false,
      text1:'请稍等'
    }
  },
  components: {
    XInput,
    XHeader,
    XButton,
    Toast,
    Group,
    Loading
  },
  methods: {
    // back () {
    //   var that = this
    //   that.$router.push({ path: '/user' })
    // },
    send (pwd) {
      this.show1 = true
      Updatepw(this.pwd).then(res => {
        this.show1 = false
      this.toastText = res.msg
      this.showPositionValue = true
      if(res.code === 1){
        var self = this
        setTimeout(function(){
          self.$router.push({path:'/user'})
        },1000)

      }
      })
      // if(this.newpassword === this.new2password){

      // }else{
      // }
      // var npw = this.newpassword
      // var opw = this.oldpasswordm
    }

  }
}
</script>

<style lang="scss">
.editPwd {
  width: 100%;
  font-size: 0.12rem;
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
  .editCon {
    margin: 0.6rem 0 0.64rem;
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
