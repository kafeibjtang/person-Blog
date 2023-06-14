<template>
  <div class="home-rigth w">
    <div class="section-background-overlay background-overlay grid-overlay-0" style="background-color: rgba(0, 0, 0, 0.4)"
      key="1"></div>
    <div class="home-rigth-info" key="2">
      <div class="row">
        <div class="row-title">HELLO!</div>
        <section class="info">
          <div class="info-title">
            <h1>我是</h1>
            <div id="typed-strings">
              <span>一名前端开发工程师</span>
              <span>积极向上的90后</span>
              <span>很高兴认识你(*^▽^*)</span>
            </div>
            <span id="typed"></span>
          </div>
          <div class="mytext">
            热衷于学习技术类知识，不断充实和提高自己，对新技术有强烈的学习欲望
            喜欢研究和构建酷炫的动画效果，用代码记录灵感和有趣的想法。
            喜欢分享自己的作品代码和文章。
            期望成为一名WEB全栈工程师，能够在前后端开发中充分发挥自己的技能和潜力。
          </div>
          <div class="btn">
            <div class="btnLeft" @click="routeComp('about')">
              <div>
                <i class="el-icon-magic-stick"></i>
                了解更多
              </div>
            </div>
            <div class="rigthBtn" @click="routeComp('assort')">
              <div>
                <i class="el-icon-folder-opened"></i>
                作品集
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import Typed from "typed.js"
export default {
  data() {
    return {
      typed: null,
    }
  },
  methods: {
    routeComp(path) {
      this.$router.push(`/home/${path}`)
      this.$bus.$emit("addIdx", `/home/${path}`)
    }
  },
  mounted() {
    this.typed = new Typed("#typed", {
      stringsElement: '#typed-strings',
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      loopCount: Infinity,
      showCursor: false,
    });
  },
  beforeDestroy() {
    if (this.typed) {
      this.typed = null
    }
  }
}
</script>
<style lang="less" scoped>
.home-rigth {
  background: url(../../../public/bgc.webp);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: scroll;
  background-position: left top;

  .background-overlay {
    z-index: 2;
  }

  .background-overlay {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
  }

  .home-rigth-info {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    z-index: 10;
    padding: 2rem;

    .row {
      transform: translate(30%, 20%);

      .row-title {
        margin-bottom: 20px;
        font-size: 18px;
      }

      .info-title {
        display: flex;
        justify-content: left;
        align-items: center;
        margin-bottom: 2rem;

        h1 {
          font-size: 40px;
          font-weight: 500;
          margin-right: 3rem;
          color: #fff;
        }

        #typed {
          font-size: 40px;
          color: #daa520;
        }
      }

      .mytext {
        font-size: 14px;
        line-height: 30px;
        width: 550px;
        margin-bottom: 1rem;
      }

      .btn {
        display: flex;
        justify-content: space-evenly;
        font-family: 微軟正黑體;
        font-size: 14px;
        letter-spacing: 1px;
        text-indent: 1px;
        padding-top: 16px;
        padding-bottom: 16px;
        border-color: #daa520;
        color: #fff;

        .btnLeft,
        .rigthBtn {
          max-width: 260px;
          padding: 15px 3rem;
          border-radius: 30px;
          text-align: center;
          cursor: pointer;
        }

        .btnLeft {
          background: #daa520;
        }

        .rigthBtn {
          border: 2px solid #daa520;

          div {
            color: #daa520;
          }
        }
      }
    }
  }
}
</style>
  