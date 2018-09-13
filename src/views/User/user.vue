<template>
  <div class="user">
    <div class="user_top">
      <el-upload
   class="user_img "
  action="http://upload.4cgame.com/index.php/api/upload/token"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :headers="headers"
  method="post"

  >
  <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;">
  <img v-else :src="userImg" alt="" style="width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;">

  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
      <!-- <div class="user_img" v-tap = {methods:upload} > -->
        <!-- <span class="btn upload">上传头像</span> -->
        <!-- <input id="image" type='file' name='myFile' size='15' onchange="showPicture(this)"/> -->
        <!-- v-bind:src="userImg" -->
        <!-- <img id="newImage"  src="http://file.4cgame.com/20180519/5813a20dafc42451be99d2b9c9560142.jpg" class="img-circle" width="100%" > -->
        <!-- <input id="file" type="file" @change="showPicture(this)"/> -->
      <!-- </div> -->
      <div class="user_text">
        <div class="top_name">{{name}}</div>
        <div class="top_yuer" style='text-align:left'>余额 {{money}} 币</div>
      </div>
      <div class="user_verify" v-if="checkID">
        <div class="img" ></div>
        未验证
      </div>
      <div class="user_verify" v-else>
        <div class="img1" ></div>
        已验证
      </div>
    </div>
    <div class="user_nav">
      <tabbar>
        <tabbar-item link='/pay'>
          <!-- <img slot="icon" src="../../assets/img/chong.png"> -->
          <div slot="icon" class="chongzhi"></div>
          <span slot="label">充值</span>
        </tabbar-item>
        <tabbar-item link='/acta'>
          <div slot="icon" class="jilu"></div>
          <!-- <img slot="icon" src="../../assets/img/jilu.png"> -->
          <span slot="label">交易记录</span>
        </tabbar-item>
        <tabbar-item  v-tap="{methods: message}">
          <div slot="icon" class="mes"></div>
          <!-- <img slot="icon" src="../../assets/img/mes.png"> -->
          <span slot="label">消息</span>
        </tabbar-item>
        <tabbar-item v-tap="{methods:signs}">
          <div slot="icon" class="qiandao"></div>
          <!-- <img slot="icon" src="../../assets/img/qiandao.png"> -->
          <span  slot="label">签到</span>
        </tabbar-item>
      </tabbar>
      <group>
        <toast v-model="showPositionValue" type="text" :time="1000" :text="toastText" position="middle"></toast>
      </group>
    </div>
    <div class="user_cell_box" ref="cell_box">
      <div class="content1">
      <x-switch title="自动登录游戏" style="height: 0.4rem;"></x-switch>
      <cell-box  title="cell" is-link v-tap="{ methods: tophone }">
        更换手机号
      </cell-box>
      <cell-box title="cell" is-link v-tap="{ methods: editPwd }">
        修改密码
      </cell-box>
      <cell-box title="cell" is-link v-tap="{ methods: idCheck }">
        实名认证
      </cell-box>
      <cell-box value="v1.0" style="margin-left: .05rem;">
        sdk版本
        <p style="float: right;margin-left: 2rem;">v1.0</p>
      </cell-box>
      <cell-box v-tap="{ methods: logout }" style="margin-left: .05rem;">
        切换账号
      </cell-box>
      <cell-box style="margin-left: .05rem;">
      </cell-box>
      </div>
    </div>
    <div>
      <loading v-model='show1' :text="text1"></loading>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { Logout, sign, UploadToken, Edit, Post } from "@/api";
import { Loading } from 'vux'
import BScroll from "better-scroll";
const options = {
  // scrollY: true
};
export default {
  data() {
    return {
      checkID: true, // 是否实名验证
      showPositionValue: false,
      toastText: "",
      phone: JSON.parse(localStorage.getItem('4CSDK-Login')).c, // 手机号,
      name: JSON.parse(localStorage.getItem('4CSDK-Login')).n, // 用户名字,
      money: JSON.parse(localStorage.getItem('4CSDK-Login')).e, // 用户余额
      userImg:
        localStorage.userImg ||
        "http://file.4cgame.com/20180519/5813a20dafc42451be99d2b9c9560142.jpg",
      nullImg: "../../assets/img/chong.png",
      imageUrl: "",
      sign: "",
      show1:false,
      text1:'正在退出'
    };
  },
  components:{
    Loading
  },
  methods: {
    des() {
      this.$router.push({ path: "/edit" });
    },
    editPwd() {
      this.$router.push({ path: "/editPwd" });
    },
    idCheck() {
      this.$router.push({ path: "/idCheck" });
    },
    logout() {
      var self = this
      this.show1 = true
      Logout().then(res => {
        this.show1 = false
        console.log(res)
        if (res.code === 1) {
          var initparams = localStorage.Initparam;
          localStorage.clear();
          // console.log(initparams)
          localStorage.Initparam = initparams;
          this.toastText = "退出成功";
          this.showPositionValue = true;
          setTimeout(() => {
            self.$router.push({path:"/login"});
          }, 1000);
        } else if (res.code === -26) {
          this.toastText = "您已经在别处登录";
          this.showPositionValue = true;
          localStorage.clear();
          localStorage.Initparam = initparams;
          setTimeout(() => {
            self.$router.push({path:"/login"});
          }, 1000);
        } else {
          this.toastText = "退出失败:" + res.msg;
          this.showPositionValue = true;
        }
      });
    },
    message() {
      this.$router.push({ path: "/message" });
    },
    // 签到模块
    signs() {
      if (this.sign === "今日已签到") {
        this.toastText = this.sign + "请明天再来";
        this.showPositionValue = true;
      } else {
        sign().then(res => {
          console.log(res)
          // 签到提示
          this.sign = res.msg;
          this.toastText = res.msg;
          this.showPositionValue = true;
        });
      }
    },
    // 验证是否绑定手机号
    tophone() {
      if (this.phone == 0) {
        this.$router.push({ path: "/bindingmobile" });
      } else {
        this.$router.push({ path: "/edit" });
      }
    },
    // 头像上传
    // upload() {
    //   Edit().then(res => {

    //   });
    // },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res.code === 1) {
        var token = res.data.token;
        // 上传头像
        Post(token, file).then(res => {
          if (res.code === 200) {
            // 设置头像
            Edit().then(res => {
              if (res.code === 1) {
              }
            });
          }
        });
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
    }
  },
  mounted() {
    //是否实名验证
    var d = JSON.parse(localStorage.getItem('4CSDK-Login')).d;
    if (d != 0) {
      this.checkID = false;
    }
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.cell_box, options);
      this.scroll.refresh();
    }, 20);
    // 是否实名验证
  },
  computed: {
    headers() {
      return {
        "x-app": "4cgame_sdk",
        "x-token": localStorage.userToken
      };
    }
  }
};
</script>

<style lang="scss">
.user {
  height: 100%;
  font-size: 0.12rem;
  .user_top {
    position: relative;
    width: 100%;
    height: 1.75rem;
    z-index: 9;
    background: linear-gradient(to right, #ff9c00, #fbba00);
    .user_img {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 10%;
      height: 0.6rem;
      width: 0.6rem;
      border-radius: 50%;
      background: pink;
      overflow: hidden;
                  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
            -webkit-user-select: none;
            -moz-user-focus: none;
            -moz-user-select: none;
            -webkit-appearance:none;
            outline: none;
            border: none;
    }
    .user_text {
      position: absolute;
      left: 1.19rem;
      top: 50%;
      transform: translateY(-50%);
      .top_name {
        font-size: 0.18rem;
      }
      .top_yuer {
        font-size: 0.13rem;
      }
    }
    .user_verify {
      box-sizing: border-box;
      padding-left: 12px;
      position: absolute;
      font-size: 12px;
      top: 0.36rem;
      right: 0;
      width: 70px;
      height: 22px;
      line-height: 23px;
      border-radius: 10px 0 0 10px;
      background: rgba(255, 255, 255, 0.5);
      text-indent: .15rem;
      .img {
      position: absolute;
      left: 11px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      font-size: 100px;
      width: 0.13rem;
      height: 0.19rem;
      background: url(../../assets/img/sdk_sprite.png) 0 -3.06rem;
      background-size: 2.4rem;
      }
      .img1 {
      position: absolute;
      left: 11px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      font-size: 100px;
      width: 0.13rem;
      height: 0.19rem;
      background: url(../../assets/img/sdk_sprite.png) 0 -0.73rem;
      background-size: 1.7rem;
      }
  }
  }
  .weui-cell__bd {
    .weui-label {
      margin-bottom: 0;
    }
  }
  .chongzhi,.jilu,.mes,.qiandao{
    width: 100%;
    height: 100%;
    background: url(../../assets/img/sdk_sprite.png) -0.6rem 0;
    background-size: 2.7rem;
  }
  .jilu{
    background-position:-0.58rem -.36rem;
  }
  .mes{
    background-position:-0.6rem -.74rem;
  }
  .qiandao{
    background-position: -0.56rem -1.14rem;
  }

  .user_nav {
    .el-menu {
      width: 100%;
      .el-menu-item {
        text-align: center;
        width: 25%;
        height: 1rem;
        line-height: 31px;
        p {
          text-align: center;
        }
      }
      .el-menu-item:nth-child(2) {
        p {
          text-indent: -0.04rem;
        }
      }
    }
    .weui-cells{
      margin-top: 0;
    }
    .weui-tabbar {
      bottom: -0.97rem;
      background: #fff;
      position: static;
      .weui-tabbar__item {
        padding: 0.2rem 0;
        box-sizing: border-box;
        .weui-tabbar__icon {
          width: 0.34rem;
          height: 0.34rem;
          img {
            width: auto;
          }
        }
        .weui-tabbar__label {
          margin-top: 8px;
        }
      }
    }
    .in_img1 {
      margin: 25px auto 0;
      width: 27px;
      height: 25px;
      background: url(../../assets/img/sdk_sprite.png) no-repeat -60px 0px;
    }
    .in_img2 {
      margin: 23px auto 0;
      width: 37px;
      height: 27px;
      background: url(../../assets/img/sdk_sprite.png) no-repeat -58px -37px;
    }
    .in_img3 {
      margin: 18px auto 0;
      width: 26px;
      height: 31px;
      background: url(../../assets/img/sdk_sprite.png) no-repeat -60px -73px;
    }
    .in_img4 {
      margin: 23px auto 0;
      width: 19px;
      height: 26px;
      background: url(../../assets/img/sdk_sprite.png) no-repeat -62px -110px;
    }
  }
  .user_cell_box {
    font-size: 0.12rem;
    overflow: hidden;
    margin: 0 0 0.4rem;
    height: 50%;
    .weui-cells {
      margin-top: 0;
    }
    .weui-cell {
      font-size: 0.16rem;
      height: 0.3rem;
      .banben {
        margin-right: 7px;
      }
      .weui-cell__bd {
        .weui-label {
        }
      }
    }

    .vux-no-group-title {
      margin-top: 0;
    }

    .weui-cell_access.vux-cell-box {
      padding-left: 0.21rem;
      font-size: 0.16rem;
    }
  }
}
#input-file {
  overflow: hidden;
  position: relative;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
}
#file {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  outline: none;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  opacity: 0;
  height: 120px;
}
#newImage {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

//
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
  -webkit-appearance: none;
  outline: none;
  border: none;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  // width: 178px;
  // height: 178px;
  // line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
