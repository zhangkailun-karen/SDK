<template>
  <div class="retrievePwdbox">
    <span class="goback fl" v-tap="{methods:goback}"></span>
    <span class="pageTitle">修改密码</span>
    <p id="tip">未绑定手机号的用户请联系客服QQ34313134586</p>
    <el-form ref="RetrievePwdForm" :model="RetrievePwdForm" class="container clearfix">
      <el-form-item class="form-item">
        <el-input v-model="RetrievePwdForm.phone" placeholder="请输入手机"></el-input>
      </el-form-item>
      <el-form-item class="form-item verify">
        <el-input v-model="RetrievePwdForm.verification" placeholder="请输入验证码"></el-input>
        <el-button type="success" class="verifybtn fr" v-tap="{methods:send,param:RetrievePwdForm}">
          <p class="text">获取验证码</p>
        </el-button>
      </el-form-item>
      <el-form-item class="form-item">
        <el-input v-model="RetrievePwdForm.password" type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" class="submit-btn" v-tap="{methods:retrieve,param:RetrievePwdForm}">修改</el-button>
      </el-form-item>
    </el-form>
    <div>
      <loading v-model='show1' :text="text1"></loading>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { Note, Backpw } from '@/api'
import {Group, Toast,AlertModule, Loading} from 'vux'
export default {
  data () {
    return {
      RetrievePwdForm: {
        phone: '',
        password: '',
        verification: '',
        toastText: '',
        showPositionValue: false
      },
      show1:false,
      text1:'请稍等'
    }
  },
  components:{
    Group,
    Toast,
    AlertModule,
    Loading
  },
  methods: {
    send (params) {
      var phone = this.RetrievePwdForm.phone
      var type = 2 // 忘记密码
      Note(phone, type).then(res => {
        this.showPositionValue = true
        if (res.code == 1) {
          let countdown = 60
          settime()
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
        } else {

        }
      }).catch(err => {

      })
    },
    goback () {
      this.$router.push({name: 'Login'})
    },
    retrieve (formName) {
      let data = {
        phone: this.RetrievePwdForm.phone,
        password: this.RetrievePwdForm.password,
        verification: this.RetrievePwdForm.verification
      }
      this.show1 = true
      Backpw(data).then(res => {
        var self = this
        this.showPositionValue = true
        this.text1 = res.msg
        setTimeout(function(){
          self.show1 = false
          self.text1 = '请稍等'
        },2000)
      })
    }
  }
}
</script>

<style lang="scss">
  .retrievePwdbox {
    font-size: .12rem;
    position: absolute;
    width:3.1rem;
    background-color: #fff;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    border-radius:0.06rem;
    padding: .06rem 0 .2rem;
    box-sizing: border-box;
    .container{
      padding:0 0.15rem;
    }
    .goback{
     margin: .18rem 0 .1rem .2rem;
    display: inline-block;
    width: 0.18rem;
    height: 0.29rem;
    background: url(/static/sdk_sprite.png) -0.2rem 2.02rem;
    background-size: 2rem;
    }
    .pageTitle{
       position: absolute;
      top:.25rem;
      left:50%;
      transform:translateX(-50%);
      font-size:18px;
    }
    #tip{
      font-size:.12rem;
      margin:.7rem 0 .2rem .2rem;
      text-align:left;
    }
    .el-form-item{
      margin-bottom:0px;
    }
    .form-item{
      margin-bottom:.1rem;
    }
    .verify{
      padding-right:110px;
      position: relative;
      .verifybtn{
        padding:0px;
        width:112px;
        position: absolute;
        top:0px;
        right:-110px;
        border-radius:1px 5px 5px 1px;
        box-sizing:border-box;
        line-height:38px;
        p{
          margin:0 auto;
        }
      }
    }
    .submit-btn{
        width:100%;
      }
  }
</style>
