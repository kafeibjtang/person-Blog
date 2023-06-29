<template>
  <footer class="copyright">
    <div class="beian">
      <p>Copyright ©2023 by @ <span>MR XIAO</span> . All rights reserved</p>
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36082802000136"
        style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img
          src="../../assets/images/备案图标.png" style="float:left;" />

        <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px;font-size: 16px; color:#939393;">赣公网安备
          36082802000136号
        </p>
      </a>
    </div>

    <div class="copyright-iframe" style="margin-top: 10px">
      <iframe name="weather_inc" src="http://i.tianqi.com/?c=code&amp;id=1" height="25" frameborder="0" marginwidth="0"
        marginheight="0" scrolling="no"></iframe>
    </div>
  </footer>
</template>

<style lang="less" scoped>
.copyright {
  padding: 20px 0;
  width: 80%;
  text-align: center;
  font-size: 16px;
  color: #000;
  border-top: 1px solid #ccc;
  margin-bottom: 20px;

  .copyright-iframe {
    display: flex;
    justify-content: center;

    iframe {
      width: 500px;
    }
  }

  .beian {
    display: flex;
    justify-content: center;
    align-items: center;

    &>p {
      margin-right: 20px;

      span {
        color: #f03c2e;
      }
    }
  }

  // span {
  //   color: #f03c2e;
  // }
}
</style>