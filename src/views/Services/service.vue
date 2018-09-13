<template>
  <div class="service">
    <div class="service-title">
        <div class="st-center ">
              <p>客服</p>
        </div>
    </div>
    <div class="server_con">
      <div class="con_item">
        <div class="con_ico">
        </div>
        <p>反馈邮箱</p>
        <p>tianqi@tq.com</p>
      </div>
      <div class="con_item">
        <div class="con_ico">
        </div>
        <p>客服qq</p>
        <p>2819239256</p>
      </div>
      <div class="con_item">
        <div class="con_ico">
        </div>
        <p>客服微信</p>
        <p>关注16游戏公众号</p>
      </div>
    </div>
    <div class="ser_remind">
      <div class="remind_con">
        <p class="r_til">温馨提示：</p>
        <p class="r_con">客服QQ在线时间为;周一至周六9:00-18:00(节假日请联系客服QQ）感
谢您对我们游戏的支持，如遇到异常情况或未及时处理的问题，请您耐
心等候客服为您解答，祝您生活愉快！</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.service {
  overflow: auto;
  width: 100%;
  .service-title {
    text-align: center;
    font-size: 0.18rem;
    width: 90%;
    height: 0.6rem;
    background-color: #efefef;
    position: fixed;
    z-index: 2;

    .st-center {
      padding: 0.215rem 0;
    }
  }
  .server_con{
    margin: 0.6rem 0 0.64rem;
    font-size: 0.12rem;
    display: flex;
    justify-content:space-between;
    padding:0.69rem 0;
    .con_item{
      width: 33.3%;
      text-align: center;
      p{
          color:#999;
          margin-bottom: 0.04rem;
        }
      .con_ico{
        margin: 0 auto 0.1rem;
        width: .439rem;
        height: .44rem;
        background: url(../../assets/img/sdk_sprite.png) no-repeat -0.44rem -1.32rem;
        background-size: 2rem;
      }
    }
    .con_item:nth-child(2) .con_ico{
      background-position-y: -1.81rem;
    }
    .con_item:last-child .con_ico{
      background-position-y: -2.29rem;
    }
  }
  .ser_remind{
    width: 90%;
    padding:0 0.15rem;
    .remind_con{
      text-align: left;
      background: #efefef;
      border-radius: 5px;
      padding:0.09rem 0.13rem;
      .r_til{
        font-size: 0.14rem;
        font-weight: 600;
        margin-bottom: 0.06rem;
        color:#333;
      }
      .r_con{
        line-height: 0.18rem;
        font-size: 0.12rem;
      }
    }
  }
}
</style>
