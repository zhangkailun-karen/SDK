<template>
  <div class="edit">
    <div class="payTil">
      <x-header header-title-color='#fff' :left-options="{backText: ''}">修改绑定手机号</x-header>
    </div>
    <div class="edit_main">
      <el-form ref="RegisterphoneForm" :model="RegisterphoneForm">
        <p>{{RegisterphoneForm.phone==='0'?'请先绑定':'您的手机号   '+ RegisterphoneForm.phone}}</p>
        <p>为了您的账号安全：需验证已绑定的手机</p>
        <el-form-item prop="verify" class="form-item verify">
          <el-input v-model="RegisterphoneForm.verification" placeholder="请输入验证码"></el-input>
          <!-- <el-button type="success" class="verifybtn fr">
            <p @click="send('RegisterphoneForm')">获取验证码</p>
          </el-button> -->
          <el-button  type="success" class="verifybtn fr" v-tap="{methods:send,param:RegisterphoneForm}">
          <p class="text">获取验证码</p>
        </el-button>
        </el-form-item>
          <x-button type="primary" v-tap='{methods:nexts}' action-type="button">下一步</x-button>
      </el-form>

    </div>
      <group>
        <toast v-model="showPositionValue" type="text" :time="1000" :text="toastText" position="middle"></toast>
      </group>
  </div>
</template>

<script>
import { XHeader, XButton,Group,Toast } from 'vux'
import { Note, Bindingmobile } from '@/api'
import $ from 'jquery'
export default {
  components: {
    XHeader,
    XButton,
    Toast,
    Group
  },
  data () {
    return {
      RegisterphoneForm: {
        verification: '',
        phone:localStorage.phone,
      },
        toastText: '',
        showPositionValue: false,
        code:''
    }
  },
  methods: {
    back () {
      this.$router.push({ path: '/user' })
    },
    send () {
      var p = localStorage.phone
      var type = 3
      // 发送验证码
      Note(p,type).then(res => {

        this.toastText = res.msg
       this.showPositionValue = true
        if(res.code === 1){
        let countdown = 60
          settime()
          //验证码定时器
          function settime () {
            if (countdown == 0) {
              $('.verifybtn')[0].removeAttribute('disabled')
              $('.text')[0].innerText = '免费获取验证码'
              countdown = 60
            } else {
              $('.verifybtn')[0].setAttribute('disabled', true)
              $('.text')[0].innerText = '重新发送(' + countdown + ')'
              countdown--
              setTimeout(function () {
                settime()
              }, 1000)
            }
          }
              // 验证码验证成功后才能进行下一步
             this.code = res.data.a
        }
      })
    },
    // 验证码输入正确才能进行下一步
    nexts(){
     if(this.RegisterphoneForm.verification != '' &this.RegisterphoneForm.verification === this.code){

        this.$router.push({path: '/bindingmobile'})
     }else{
       this.toastText = '验证码为空或验证码不正确'
       this.showPositionValue = true
     }
    }
  }
}
</script>

<style lang="scss">
.edit {
  background: #fff;
  font-size: 0.18rem;
  height: 100%;
  overflow-y: auto;
}
// 头部
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
// 中间部分
.edit_main {
  margin: 0.58rem 0 0.64rem;
  padding: 0.23rem;
  overflow: auto;

  p,
  input {
    font-size: 0.12rem;
    float: left;
    margin-bottom: 0.13rem;
  }
  p:nth-child(2) {
    color: #999;
  }
  .el-form-item{
    margin-bottom: 0;
    width: 100%;
  }
    // 下一步按钮
  .weui-btn{
    width:100%;
    line-height: 2.5;
    font-size: 0.14rem;
    background: #ffad06;
  }
}
//验证码模块
.verify {
  // position: relative;
  float: left;
  .sub{
    position: absolute;
    top:1rem;
    left: 50%;
    transform: translateX(-50%);
    width:100%;
    background:#ffad06;
  }
  //获取验证码按钮
  .verifybtn {
    padding: 0px;
    width: 112px;
    position: absolute;
    top: 0px;
    right: 0;
    border-radius: 1px 5px 5px 1px;
    box-sizing: border-box;
    line-height: 38px;
    p {
      margin: 0 auto;
      width: 100%;
      text-align: center;
    }
  }

}

</style>
